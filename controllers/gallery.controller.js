const { GalleryModel: Gallery } = require('../models/gallery.model')
const { uploadFile, deleteFile } = require('../utils/file-uploader.util')

const dummyGalleryData = {
  slider: [],
  images: []
}

exports.getGalleryItems = async (req, res) => {
  try {
    const gallery = await Gallery.find()
    if (gallery.length === 0) {
      console.log('Gallery Not Found in DB! Saving dummy data...')
      const newGallery = new Gallery(dummyGalleryData)
      await newGallery.save()
      res.status(200).json({ gallery: newGallery })
    } else {
      console.log('Gallery Found In DB')
      res.status(200).json({ gallery: gallery[0] })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.addGalleryItems = async (req, res) => {
  const gallery = await Gallery.findOne({})
  if (req.body.image) {
    uploadFile(req.body.image)
      .then((imageUrl) => {
        if (req.body.type === 'image-item') {
          // @ts-ignore
          gallery.images.push({
            image: imageUrl,
            description: req.body.description
          })
        } else if (req.body.type === 'slider-item') {
          // @ts-ignore
          gallery.slider.push({
            image: imageUrl,
            description: req.body.description,
            title: req.body.title
          })
        } else {
          return res.status(500).json({
            status: 'error',
            message: 'Invalid type'
          })
        }
        // @ts-ignore
        gallery
          .save()
          .then(() => {
            return res.status(200).json({
              status: 'ok',
              message: 'gallery item added'
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
        return res.status(500).json({
          status: 'error',
          message: 'Error while uploading image to bucket',
          error
        })
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
