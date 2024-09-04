import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useFetchCategories from '../utils/useFetchCategories';
import useFetchIndividualBlog from '../utils/useFetchIndividualBlog';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { name: fetchedName, title: fetchedTitle, content: fetchedContent, image: fetchedImage, category: fetchedCategory } = useFetchIndividualBlog(id);
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const { loading, error, getCategories } = useFetchCategories();
    const { categories } = getCategories;

    useEffect(() => {
        setName(fetchedName);
        setTitle(fetchedTitle);
        setContent(fetchedContent);
        setSelectedCategory(fetchedCategory);
        setImagePreview(fetchedImage);
    }, [fetchedName, fetchedTitle, fetchedContent, fetchedCategory, fetchedImage]);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", selectedCategory);
        if (image) {
            formData.append("image", image);
        }
        
        try {
            const response = await axios.put(`http://localhost:4000/blog/${id}`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            navigate("/home")
        } catch (error) {
            console.log(error);
        }
    };

    if (loading || !categories) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <p className='text-red-500'>{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-8">Update Blog Post</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Name</label>
                    <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Title</label>
                    <input
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                    />
                </div>

                <div>
                    <label className='block text-lg font-medium text-gray-700'>Category</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'>
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Content</label>
                    <textarea
                        placeholder='Write your content here'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                        rows={5}
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Image</label>
                    <input
                        type='file'
                        onChange={handleChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                    />
                    {imagePreview && (
                        <div className='mt-4'>
                            <img
                                src={imagePreview}
                                alt='Image Preview'
                                className="max-w-full h-72 rounded-lg shadow-sm"
                            />
                        </div>
                    )}
                </div>

                <div className='text-center'>
                    <button type='submit' className="w-full py-3 px-6  bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700">
                        Update Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;
