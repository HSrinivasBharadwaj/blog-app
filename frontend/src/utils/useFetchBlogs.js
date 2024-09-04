import axios from 'axios';
import React,{useState,useEffect} from 'react'

const useFetchBlogs = (page=1,search) => {
    const [blogs, setBlogs] = useState([]);
    const [error,setError] = useState("");
    const [totalPages,setTotalPages]=useState(1);
  useEffect(() => {
    fetchAllBlogs(page,search)
  },[page,search])
  const fetchAllBlogs = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/blog?page=${page}&limit=5&search=${search}`);
        setBlogs(response.data.blogs);
        setTotalPages(response.data.totalPages);
    } catch (error) {
        setError(error.message)
    }
  }
  return {error,blogs,totalPages }
}

export default useFetchBlogs