import { Request, Response } from 'express';
import { blogModel } from '../models/blog.model';

//Add New blog
export const AddNewBlog = (req: Request, res: Response) => {
  let newEvent = new blogModel(req.body);
  newEvent
    .save()
    .then(() => {
      res.send({
        status: true,
        data: 'BLOG_CREATED',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        data: 'BLOG_NOT_CREATED',
        path: req.path,
        err: err,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

//View all blog
export const ViewAllBlog = (req: Request, res: Response) => {
  blogModel
    .find()
    .then((events) => {
      res.send({
        status: true,
        data: events,
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    })
    .catch((err) => {
      res.send({
        status: false,
        data: 'SOMETHING_WENT_WRONG',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};
//view one blog
export const ViewOneBlog = (req: Request, res: Response) => {
  blogModel
    .findById(req.body.id)
    .then((blog) => {
      if (blog) {
        res.send({
          status: true,
          data: blog,
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      } else {
        res.send({
          status: false,
          data: 'BLOG_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        data: 'BLOG_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

//Update a blog
export const UpdateBlog = (req: Request, res: Response) => {
  blogModel
    .findByIdAndUpdate(req.body.id, req.body)
    .then((event) => {
      if (event) {
        res.send({
          status: true,
          data: 'BLOG_UPDATED',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      } else {
        res.send({
          status: false,
          data: 'BLOG_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      }
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'BLOG_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};

//Delete a blog
export const DeleteBlog = (req: Request, res: Response) => {
  blogModel
    .findByIdAndDelete(req.body.id)
    .then((event) => {
      if (event) {
        res.send({
          status: true,
          data: 'blog_DELETED',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      } else {
        res.send({
          status: false,
          data: 'blog_NOT_FOUND',
          path: req.path,
          timestamp: Math.trunc(Date.now() / 1000),
        });
      }
    })
    .catch(() => {
      res.send({
        status: false,
        data: 'blog_NOT_FOUND',
        path: req.path,
        timestamp: Math.trunc(Date.now() / 1000),
      });
    });
};


//Likes count of a blog
export const LikesCountInBlog = (req: Request, res: Response) => {
  blogModel.findById(req.body.id).then((blog: any) => {
    blog.Likes++;
    blog
    .save()
    .then(() =>{
      res.send({
        data: 'likes increased',
      })
    })
  .catch(() => {
    res.send({
    data: 'likes increased',
    });
  })
  .catch((err: any) => {
    res.send({
      data: err,
    });
  });
  });
}

//Count the views in blog
export const CountViewsInBlog = (req: Request, res: Response) => {
  blogModel.findById(req.body.id).then((blog: any) => {
    blog.view++;
    blog
      .save()
      .then(() => {
        res.send({
          data: 'View incremented',
        });
      })
      .catch((err: any) => {
        res.send({
          data: err,
        });
      });
  });
};

