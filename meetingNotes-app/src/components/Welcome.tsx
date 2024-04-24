import React from 'react';

const WelcomeMessage = () => {
  return (
    <div className="flex justify-center items-start h-screen bg-gradient-to-r from-blue-200 to-blue-200">
      <div className="text-left text-black mt-24 ml-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <h1 className="text-5xl font-extrabold mb-6">Welcome to Our Meeting Notes Platform</h1>
        <p className="text-lg text-center">Start organizing and managing your meetings efficiently.</p>
        <p className="text-lg mt-4 text-center">Stay on track and collaborate seamlessly.</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
