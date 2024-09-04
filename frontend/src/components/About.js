import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold mb-4">About This App</h1>
      <p>
        Welcome to our Blog App! This application allows users to manage their blog posts with ease. Key features include:
      </p>
      <ul className="list-disc list-inside ml-5 mt-4">
        <li><strong>Add:</strong> Create new blog posts effortlessly.</li>
        <li><strong>Edit:</strong> Make changes to your existing blog posts.</li>
        <li><strong>Update:</strong> Keep your content current with updates.</li>
        <li><strong>Delete:</strong> Remove blog posts that are no longer needed.</li>
        <li><strong>Search:</strong> Find posts quickly with our search functionality.</li>
        <li><strong>Login/Logout:</strong> Securely access your account and manage your posts.</li>
        <li><strong>Signup:</strong> Register and start using the app in no time.</li>
      </ul>
      <p className="mt-4">
        We hope you find this app useful and easy to use. Happy blogging!
      </p>
    </div>
  );
};

export default About;
