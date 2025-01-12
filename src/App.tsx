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
import SalesPage from "./pages/SalesPage";
import ExpensePage from "./pages/ExpensePage";
import ExpenseCategoryPage from "./pages/ExpenseCategoryPage";
import ExpenseItemPage from "./pages/ExpenseItemPage";
import PettyCashPage from "./pages/PettyCashPage";
import MessageCenterPage from "./pages/MessageCenterPage";
import InventoryPage from "./pages/InventoryPage";

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
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/expense-category" element={<ExpenseCategoryPage />} />
        <Route path="/expense-item" element={<ExpenseItemPage />} />
        <Route path="/petty-cash" element={<PettyCashPage />} />
        <Route path="/message-center" element={<MessageCenterPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
