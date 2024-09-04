import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Validate } from '../utils/validation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const goToLoginPage = () => {
    navigate("/")
  }

  const handleChange = (e, field) => {
    const { value } = e.target;
    switch (field) {
      case 'name':
        setName(value);
        if (error.name) {
          setError((prevError) => ({ ...prevError, name: " " }))
        }
        break;
      case "email":
        setEmail(value);
        if (error.email) {
          setError((prevError) => ({ ...prevError, email: " " }))
        }
        break;
      case "password":
        setPassword(value);
        if (error.password) {
          setError((prevError) => ({ ...prevError, password: " " }))
        }
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        if (error.confirmPassword) {
          setError((prevError) => ({ ...prevError, confirmPassword: " " }))
        }
        break;
      default:
        break;
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const validateErrorMessages = Validate(name, email, password, confirmPassword);
    if (Object.keys(validateErrorMessages).length > 0) {
      setError(validateErrorMessages)
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/signup", {
        name,
        email,
        password
      })
      console.log("response",response)
      toast.success(response.data.message);
      setError({})
      setTimeout(() => {
        navigate("/")
      }, 5000);
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Registration Form</h1>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => handleChange(e, 'name')}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {/* Displaying the error messages */}
            {error.name && <p className='text-red-500 font-semibold'>{error.name}</p>}
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => handleChange(e, 'email')}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {error.email && <p className='text-red-500 font-semibold'>{error.email}</p>}
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => handleChange(e, 'password')}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {error.password && <p className='text-red-500 font-semibold'>{error.password}</p>}
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => handleChange(e, 'confirmPassword')}
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {error.confirmPassword && <p className='text-red-500 font-semibold'>{error.confirmPassword}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md "
            >
              Register
            </button>
          </div>
          <div>
            <span className='cursor-pointer text-center' onClick={goToLoginPage}>Already have an account yet? LogIn</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm;
