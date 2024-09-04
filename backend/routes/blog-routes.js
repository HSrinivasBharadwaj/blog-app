const express = require('express');
const blogRouter = express.Router();
const {GetAllBlogs,GetBlogById,CreateBlog, DeleteBlog, UpdateBlog} = require('../controllers/blog-controller');
const upload = require('../middleware/upload');

blogRouter.post("/",upload.single('image'),CreateBlog);
blogRouter.get("/",GetAllBlogs );
blogRouter.get("/:id",GetBlogById );
blogRouter.put("/:id",upload.single('image'),UpdateBlog);
blogRouter.delete("/:id",DeleteBlog);

module.exports = blogRouter