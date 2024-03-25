import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import  OfficePage  from "./page/OfficePage/OfficePage";
import OutlookPage from "./page/OutlookPage/OutlookPage";
import OtherPage from "./page/OtherPage/OtherPage";
import AolPage from "./page/AolPage/AolPage";
import Yaho from "./components/yahoo";
import "./App.css";

// Import other page components similarly

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/office" element={<OfficePage />} />
        <Route path="/outlook" element={<OutlookPage />} />
        <Route path="/others" element={<OtherPage />} />
        <Route path="/aol" element={<AolPage />} />
        <Route path="/yahoo" element={<Yaho />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
