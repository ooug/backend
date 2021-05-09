// eslint-disable-next-line no-unused-vars
const { Request, Response, NextFunction } = require('express')
const joi = require('joi')
const { StatusCodes } = require('http-status-codes')

const { GalleryModel: Gallery } = require('../models/gallery.model')
const { uploadFile, deleteFile } = require('../utils/file-uploader.util')

/**
 * get Gallery Items
 * @function
 * @name getGalleryItems
 * @param {Request} _req
 * @param {Response} res
 */
exports.getGalleryItems = async (_req, res) => {
  try {
    const gallery = await Gallery.find()
    if (gallery.length === 0) {
      // Gallery not found in DB!
      res.status(StatusCodes.NOT_FOUND).json({ message: 'gallery not found' })
    } else {
      // Gallery found in DB
      res.status(StatusCodes.OK).json({ gallery: gallery[0] })
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

/**
 * add Gallery Items
 * @function
 * @name addGalleryItems
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 */
exports.addGalleryItems = async (req, res, _next) => {
  const schema = joi.object({
    image: joi.string().required(),
    description: joi.string().required(),
    title: joi.string().optional().default(null),
    type: joi.string().required().allow('image-item', 'slider-item')
  })
  const { value: payload, error } = schema.validate(req.body)
  if (error) {
    return res
      .status(StatusCodes.PRECONDITION_FAILED)
      .json({ message: error.message })
  }
  try {
    const gallery = await Gallery.findOne({})

    if (!gallery) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'gallery not found' })
    }

    const imageUrl = await uploadFile(payload.image)

    if (payload.type === 'image-item') {
      gallery.updateOne({
        images: [
          ...gallery.get('images'),
          {
            image: imageUrl,
            description: payload.description
          }
        ]
      })
    }

    if (payload.type === 'slider-item') {
      gallery.updateOne({
        sliders: [
          ...gallery.get('sliders'),
          {
            image: imageUrl,
            description: payload.description,
            title: payload.title
          }
        ]
      })
    }

    res.status(StatusCodes.CREATED).json({ message: 'gallery item added' })
  } catch (error) {
    console.error('addGalleryItems:-', error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error while uploading image to bucket'
    })
  }
}

exports.deleteGalleryItems = async (req, res) => {
  const gallery = await Gallery.findOne({})
  let publicUrl = null
  if (req.query.type === 'image-item') {
    // @ts-ignore
    gallery.images = gallery.images.filter((e) => {
      if (String(e._id) !== req.params.id) {
        return e
      }
      publicUrl = e.image
      return null
    })
  } else if (req.query.type === 'slider-item') {
    // @ts-ignore
    gallery.slider = gallery.slider.filter((e) => {
      if (String(e._id) !== req.params.id) {
        return e
      }
      publicUrl = e.image
      return null
    })
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Invalid type'
    })
  }
  deleteFile(publicUrl)
    .then((data) => {
      console.log(data)
      // @ts-ignore
      gallery
        .save()
        .then(() => {
          return res.status(200).json({
            status: 'ok',
            message: 'gallery item deleted',
            gallery
          })
        })
        .catch((error) => {
          return res.status(500).json({
            status: 'error',
            message: 'Error while updating DB',
            error
          })
        })
    })
    .catch((error) => {
      console.log(error)
      return res.status(502).json({
        status: 'error',
        message: 'Unable to delete',
        error
      })
    })
}
