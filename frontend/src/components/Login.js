import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Validate } from '../utils/validation';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/login", {
                email,
                password
            })
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("name",response.data.existingUser.name)
            navigate("/home")
        } catch (error) {
            if (error.response.data.message) {
                setError(error.response.data.message)
            }
            else {
                setError({global: "An unexpected error occurred. Please try again later."})
            }
        }
    }


    const goToSignUpPage = () => {
        navigate("/signup")
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Login</h1>
                <form onSubmit={submitForm} className='space-y-4'>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-md "
                        />
                        {error && <p className='text-red-500 font-semibold'>{error}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 border border-gray-300 rounded-md "
                        />
                        
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white rounded-md "
                        >
                            Login
                        </button>
                    </div>
                    {error.global && <p className='text-red-500 font-semibold'>{error.global}</p>}
                    <div>
                        <span className='cursor-pointer text-center' onClick={goToSignUpPage}>Didn't have an account yet? Sign Up</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login