const Blog = require('../models/blog');


const CreateBlog = async (req, res, next) => {
    const { name, title, content, category } = req.body;
    const imageUrl = req.file ? req.file.filename : '';
    console.log("imageUrl: " + imageUrl);
    try {
        const newBlog = await Blog.create({
            name,
            title,
            content,
            category,
            imageUrl
        })
        const createdBlog = await newBlog.save();
        return res.status(201).json(createdBlog)
    } catch (error) {
        return res.status(500).json({ message: "Error while creating blog" })
    }
}


const GetAllBlogs = async (req, res, next) => {
    //Declare the query params 
    //How many pages and limit
    const { page = 1, limit = 5, search = " " } = req.query;
    try {
        const searchQuery = search ? {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { name: { $regex: search, $options: "i" } },
                { tech: { $regex: search, $options: "i" } }
            ]
        } : {}
        //Getting the limit and skipping
        const blogs = await Blog.find(searchQuery)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        //Get the total number of blogs in the collection
        const count = await Blog.countDocuments(searchQuery)
        return res.status(200).json({
            blogs,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        return res.status(500).json({ message: "Error while fetching all the blogs" })
    }
}

const GetBlogById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const getSingleBlog = await Blog.findById(id);
        return res.status(200).json(getSingleBlog)
    } catch (error) {
        return res.status(500).json({ message: "Error while fetching the single blog" })
    }
}


const UpdateBlog = async (req, res, next) => {
    console.log("Request file:", req.file);
    const { id } = req.params;
    const { name, title, content, category } = req.body;
    const imageUrl = req.file ? `${req.file.filename}` : ''

    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, {
            name,
            title,
            content,
            category,
            imageUrl
        })
        if (!updateBlog) {
            return res.status(400).json({ message: "Cant update the blog" })
        }
        return res.status(201).json({ message: "Blog updated successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Failed to update blog" })
    }
}

const DeleteBlog = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(400).json({ message: "Blog not found" })
        }
        return res.status(200).json({ message: "Blog deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Failed to update blog" })
    }
}

module.exports = { GetAllBlogs, GetBlogById, CreateBlog, DeleteBlog, UpdateBlog }