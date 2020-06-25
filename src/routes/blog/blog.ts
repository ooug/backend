import { Router, RouterOptions } from 'express';
import { blogService }  from '../../services';

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
} as RouterOptions;

const $ = Router(options);

//creating a new blog
$.post('/create',blogService.AddNewBlog);

//get all blog
$.get('/get-all',blogService.ViewAllBlog);

//get one blog
$.get('/get-one', blogService.ViewOneBlog);

//update a blog
$.patch('/update-one', blogService.UpdateBlog);

//delete a blog 
$.delete('/delete-one', blogService.DeleteBlog)












export default $;