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
      const newGallery = new Gallery({
        sliders: [],
        images: []
      })
      await newGallery.save()
      res.status(StatusCodes.OK).json({ gallery: newGallery })
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
    image: joi.object().required(),
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
      await gallery.updateOne({
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
      await gallery.updateOne({
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

/**
 * delete gallery items
 * @function
 * @name deleteGalleryItems
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} _next
 */
exports.deleteGalleryItems = async (req, res, _next) => {
  const gallery = await Gallery.findOne({})
  let publicUrl = null
  if (gallery) {
    if (req.query.type === 'image-item') {
      gallery.images = gallery.images.filter((e) => {
        if (String(e._id) !== req.params.id) {
          return e
        }
        publicUrl = e.image
        return null
      })
    } else if (req.query.type === 'slider-item') {
      gallery.sliders = gallery.sliders.filter((e) => {
        if (String(e._id) !== req.params.id) {
          return e
        }
        publicUrl = e.image
        return null
      })
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Invalid type'
      })
    }
    try {
      await deleteFile(publicUrl)
      await gallery.save()
      return res.status(StatusCodes.OK).json({
        message: 'gallery item deleted',
        gallery
      })
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Error while deleting gallery item',
        error
      })
    }
  }
}
