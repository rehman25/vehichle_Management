import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
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
import ReportsDailySalesPage from "./pages/CustomerLedger";
// import ReportExpensePage from "./pages/ReportExpensePage";
import ReportPettyCashPage from "./pages/ReportPettyCashPage";
import CreditServicingPage from "./pages/CreditServicingPage";
import Vehicle from "./pages/Vehicle";
import TransferVehicle from "./pages/TransferVehicle";
import PaymentCollections from "./pages/Payment&Collections";
import CustomerBalanceSummary from "./pages/CustomerBalanceSummary";
import GeneralTransaction from "./pages/GeneralTransaction";

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
        <Route path="/CustomerLedger" element={<ReportsDailySalesPage />} />
        <Route path="/CustomerBalanceSummary" element={<CustomerBalanceSummary />} />
        <Route path="/report-petty-cash" element={<ReportPettyCashPage />} />
        <Route path="/credit-servicing" element={<CreditServicingPage />} />
        <Route path="/Vehicle" element={<Vehicle />} />
        <Route path="/TransferVehicle" element={<TransferVehicle />} />
        <Route path="/PaymentCollections" element={<PaymentCollections />} />
        <Route path="/GeneralTransaction" element={<GeneralTransaction />} />
      </Routes>
    </Router>
  );
};

export default App;
