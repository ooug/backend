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

$.get('/get', getGalleryItems)

$.post('/add', addGalleryItems)

$.delete('/delete/:id', deleteGalleryItems)

module.exports = $
