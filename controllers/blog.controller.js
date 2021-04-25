// eslint-disable-next-line no-unused-vars
const e = require('express')

const { BlogModel } = require('../models')

/**
 * Add New blog
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.AddNewBlog = (req, res) => {
  const newEvent = new BlogModel(req.body)
  newEvent
    .save()
    .then(() => {
      res.send({
        status: true,
        data: 'BLOG_CREATED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
    .catch((err) => {
      res.send({
        status: false,
        data: 'BLOG_NOT_CREATED',
        path: req.path,
        err: err,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * View all blog
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.ViewAllBlog = (req, res) => {
  BlogModel.find()
    .then((events) => {
      res.send({
        status: true,
        data: events,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'SOMETHING_WENT_WRONG',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * view one blog
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.ViewOneBlog = (req, res) => {
  BlogModel.findById(req.body.id)
    .then((blog) => {
      if (blog) {
        res.send({
          status: true,
          data: blog,
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      } else {
        res.send({
          status: false,
          data: 'BLOG_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      }
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'BLOG_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * Update a blog
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.UpdateBlog = (req, res) => {
  BlogModel.findByIdAndUpdate(req.body.id, req.body)
    .then((event) => {
      if (event) {
        res.send({
          status: true,
          data: 'BLOG_UPDATED',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      } else {
        res.send({
          status: false,
          data: 'BLOG_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      }
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'BLOG_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * Delete a blog
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.DeleteBlog = (req, res) => {
  BlogModel.findByIdAndDelete(req.body.id)
    .then((event) => {
      if (event) {
        res.send({
          status: true,
          data: 'blog_DELETED',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      } else {
        res.send({
          status: false,
          data: 'blog_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000)
        })
      }
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'blog_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000)
      })
    })
}

/**
 * Likes count of a blog
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.LikesCountInBlog = (req, res) => {
  BlogModel.findById(req.body.id).then(
    /**
     * @param {*} blog
     */
    (blog) => {
      if (!blog) {
        throw new Error('Blog not found')
      }
      blog.Likes++
      blog
        .save()
        .then(() => {
          res.send({
            data: 'likes increased'
          })
        })
        .catch(() => {
          res.send({
            data: 'likes increased'
          })
        })
        .catch(
          /**
           * @param {Error} err
           */
          (err) => {
            res.send({
              data: err
            })
          }
        )
    }
  )
}

/**
 * Count the views in blog
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.CountViewsInBlog = (req, res) => {
  BlogModel.findById(req.body.id).then(
    /**
     * @param {*} blog
     */
    (blog) => {
      if (!blog) {
        throw new Error('Blog not found')
      }
      blog.view++
      blog
        .save()
        .then(() => {
          res.send({
            data: 'View incremented'
          })
        })
        .catch(
          /**
           * @param {Error} err
           */
          (err) => {
            res.send({
              data: err
            })
          }
        )
    }
  )
}
