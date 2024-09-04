import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchBlogs from '../utils/useFetchBlogs';

function Home() {
  const [search,setSearch] = useState("")
  const [page,setPage]=useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const { error, blogs,totalPages } = useFetchBlogs(page,search);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1)
  }
  

  if (error) {
    return <p className='text-red-500 font-semibold'>{error}</p>;
  }

  if (!blogs || blogs.length === 0) {
    return <p>No Blogs available...</p>;
  }

  const navigateToBlogPage = (id) => {
    navigate("/blog/"+id)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-xl rounded-lg cursor-pointer">
      <h2 className="text-2xl font-bold text-center mb-8">Blog Posts</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by title, name, or category"
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      {blogs.map(blog => (
        <div onClick={() => navigateToBlogPage(blog._id)} key={blog._id} className="mb-8 p-6 border border-gray-300 rounded-lg shadow-sm">
          {blog.imageUrl && (
            <img
              src={`http://localhost:4000/uploads/${blog.imageUrl.split('\\').pop()}`}
              alt={blog.title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 flex items-center">
              By <span className='font-bold mx-2'>{blog.name}</span>
            </p>
            <span className="text-blue-600 font-semibold">{blog.category}</span> 
          </div>
          <p className="text-gray-800 line-clamp-3">{blog.content}</p>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button 
          onClick={handlePreviousPage} 
          disabled={page === 1}
          className={`px-4 py-2 ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}>
          Previous
        </button>
        <button 
          onClick={handleNextPage} 
          disabled={page === totalPages}
          className={`px-4 py-2 ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
