import React from 'react';
import Logo from '../Logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const getToken = sessionStorage.getItem("token");
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/")
    }
    const goToAboutPage = () => {
        navigate("/about")
    }
    const goToHome = () => {
        navigate("/home")
    }
    return (
        <header className="bg-gray-900 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="flex items-center">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-8 mr-3"
                    />
                    <h1 className="text-xl font-bold">Blog To</h1>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li onClick={goToHome}>
                            <a
                                href="#home"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Home
                            </a>
                        </li>
                        <li onClick={goToAboutPage}>
                            <a
                                href="#about"
                                className="hover:text-blue-400 transition-colors"
                            >
                                About
                            </a>
                        </li>

                        <li>
                            {getToken ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate('/')}
                                    className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Sign In
                                </button>
                            )}

                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
