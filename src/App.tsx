import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/Auth/LoginPage";
import SIgnUpPage from "./pages/Auth/SIgnUpPage";
import VerificationPage from "./pages/Auth/VerificationPage";
import OtpPage from "./pages/Auth/OtpPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import CustomersPage from "./pages/CustomersPage";
import ItemsPage from "./pages/ItemsPage";

type AppProps = {};
const App: React.FC<AppProps> = () => {
  // comment here
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<SIgnUpPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/items" element={<ItemsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
