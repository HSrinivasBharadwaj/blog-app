import React from 'react';
import useFetchIndividualBlog from '../utils/useFetchIndividualBlog';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const IndividualBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { error, name, title, content, category, image, blogId } = useFetchIndividualBlog(id);

    if (error) {
        return <p className='text-red-500 font-semibold text-center mt-5'>{error}</p>;
    }

    const imageUrl = image ? `http://localhost:4000/uploads/${image.split('\\').pop()}` : null;

    const goToHomePage = () => {
        navigate("/home")
    }

    const goToUpdateBlog = (id) => {
        navigate("/update/"+id)
    }

    const deleteBlog = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog");
        if (!confirmDelete) return
        try {
            await axios.delete(`http://localhost:4000/blog/${id}`)
            navigate("/home")
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

            {imageUrl && (
                <div className="w-full h-64 bg-cover bg-center mb-6 rounded-lg" style={{ backgroundImage: `url(${imageUrl})` }}></div>
            )}

            <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 font-medium">By {name}</p>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">{category}</span>
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed mb-6">
                {content}
            </div>



            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between items-center mt-8">
                <button
                    onClick={goToHomePage}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
                >
                    Back to Blogs
                </button>
                <div className="space-x-4 mt-4 md:mt-0 lg:mt-0 xl:mt-0">
                    <button
                        onClick={() => deleteBlog(blogId)}
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition duration-300"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => goToUpdateBlog(blogId)}
                        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition duration-300"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IndividualBlog;

