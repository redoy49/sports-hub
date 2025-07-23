import React from 'react';
import { ShieldOff } from 'lucide-react'; // Importing an icon from lucide-react

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4"> {/* Changed to flex-col for vertical stacking */}
      <div className="text-center max-w-lg w-full"> {/* Removed card styling, kept max-width and center alignment */}
        <div className="mb-6">
          <ShieldOff className="w-24 h-24 mx-auto text-error animate-bounce" /> {/* Changed icon color to DaisyUI error color */}
        </div>
        <h1 className="text-6xl font-extrabold text-error mb-4 tracking-wider"> {/* Changed 403 color to DaisyUI error color */}
          403
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Access Denied
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          It seems you've stumbled upon a forbidden zone. You do not have the necessary
          permissions to view this page.
        </p>
        <button
          onClick={() => window.location.href = '/'} // Simple navigation to home
          className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75" // Applied the new button class
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Forbidden;

