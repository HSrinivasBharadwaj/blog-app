import React, { useState } from 'react';
import Logo from '../Logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const getToken = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("name");

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        navigate("/");
    };

    const goToAboutPage = () => {
        navigate("/about");
        setIsMobileMenuOpen(false); 
    };

    const goToHome = () => {
        navigate("/home");
        setIsMobileMenuOpen(false); 
    };

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
                <div className="flex items-center space-x-4 md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            ></path>
                        </svg>
                    </button>
                </div>
                <nav className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-50 md:static md:flex md:space-x-6 md:bg-transparent md:bg-none md:items-center transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 md:ml-4 md:mt-0">
                        <li onClick={goToHome} className="cursor-pointer">
                            <a
                                href="#home"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Home
                            </a>
                        </li>
                        <li onClick={goToAboutPage} className="cursor-pointer">
                            <a
                                href="#about"
                                className="hover:text-blue-400 transition-colors"
                            >
                                About
                            </a>
                        </li>

                        {getToken && (
                            <li className="flex items-center space-x-4">
                                <span className="text-white">Welcome, {username}!</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </li>
                        )}

                        {!getToken && (
                            <li>
                                <button
                                    onClick={() => navigate('/')}
                                    className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Sign In
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
