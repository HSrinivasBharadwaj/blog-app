import React,{useState,useEffect} from 'react';
import axios from 'axios';

const useFetchCategories = () => {
    const [getCategories,setGetCategories] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("")
    useEffect(() => {
        fetchCategories()
    },[])

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:4000/category/categories")
            setGetCategories(response.data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
  return {loading,error,getCategories}
}

export default useFetchCategories 