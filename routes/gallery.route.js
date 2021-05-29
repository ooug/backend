const {
  getGalleryItems,
  addGalleryItems,
  deleteGalleryItems
} = require('../controllers/gallery.controller')
const e = require('express')

/**
 * @type {e.RouterOptions}
 */
const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false
}

const $ = e.Router(options)

$.get('/', getGalleryItems)

$.post('/', addGalleryItems)

$.delete('/:id', deleteGalleryItems)

module.exports = $
