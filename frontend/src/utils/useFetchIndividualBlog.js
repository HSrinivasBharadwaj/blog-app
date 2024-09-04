import React,{useState,useEffect} from 'react';
import axios from 'axios';

const useFetchIndividualBlog = (id) => {
    const [name,setName] = useState("");
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState(null);
    const [error,setError] = useState("");
    const [blogId,setBlogId] = useState(null);
    useEffect(() => {
        fetchIndividualBlog();
    },[])
    const fetchIndividualBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/blog/${id}`);
            setName(response.data.name);
            setTitle(response.data.title);
            setContent(response.data.content);
            setCategory(response.data.category);
            setImage(response.data.imageUrl);
            setBlogId(response.data._id)
        } catch (error) {
            setError(error)
        }
    }
  return {error,name,title,content,category,image,blogId}
}

export default useFetchIndividualBlog