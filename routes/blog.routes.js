import e from 'express'
import {
  AddNewBlog,
  CountViewsInBlog,
  DeleteBlog,
  UpdateBlog,
  ViewOneBlog,
  LikesCountInBlog,
  ViewAllBlog
} from '../controllers/index.js'

/**
 * @type {e.RouterOptions}
 */
const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false
}

const $ = e.Router(options)

// creating a new blog
$.post('/create', AddNewBlog)
// get all blog
$.get('/get-all', ViewAllBlog)
// get one blog
$.get('/get-one', ViewOneBlog)
// update a blog
$.patch('/update-one', UpdateBlog)
// delete a blog
$.delete('/delete-one', DeleteBlog)
// view count
$.post('/view-count', CountViewsInBlog)
// likes count
$.post('/likes-count', LikesCountInBlog)

export default $
