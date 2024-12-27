import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/Auth/LoginPage";
import SIgnUpPage from "./pages/Auth/SIgnUpPage";
import VerificationPage from "./pages/Auth/VerificationPage";
import OtpPage from "./pages/Auth/OtpPage";

type AppProps = {};
const App: React.FC<AppProps> = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SIgnUpPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
