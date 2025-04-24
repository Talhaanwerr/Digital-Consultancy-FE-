import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
// Import auth pages
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import ForgotPassword from "./views/auth/ForgotPassword";
import VerifyOTP from "./views/auth/VerifyOTP";
import ResetPassword from "./views/auth/ResetPassword";
import Users from "./views/users/Users";
import AddUser from "./views/users/AddUser";
import EditUser from "./views/users/EditUser";
import ViewUser from "./views/users/ViewUser";
import MainLayout from "./components/MainLayout";

// Import Business Registration Pages
import SoleProprietor from "./views/business/SoleProprietor";
import NTNModification from "./views/business/NTNModification";
import PrivateLimited from "./views/business/PrivateLimited";
import CompanyReturnFiling from "./views/company/CompanyReturnFiling";
import ViewCompanyReturn from "./views/company/ViewCompanyReturn";

// Import NTN Management Pages
import NTNList from "./views/ntn/NTNList";
import ViewNTN from "./views/ntn/ViewNTN";

// Import FAQ Pages
import FAQList from "./views/faq/FAQList";
import FAQForm from "./views/faq/FAQForm";
import ViewFAQ from "./views/faq/ViewFAQ";

const App = () => {
  console.log("App component rendered");
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes - public, outside MainLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/verify" element={<VerifyOTP />} />
        <Route path="/forgot-password/reset" element={<ResetPassword />} />

        {/* Dashboard routes wrapped with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/users/view/:id" element={<ViewUser />} />

          {/* Business Registration Routes */}
          <Route
            path="/business/sole-proprietor"
            element={<SoleProprietor />}
          />
          <Route
            path="/business/ntn-modification"
            element={<NTNModification />}
          />
          <Route
            path="/business/private-limited"
            element={<PrivateLimited />}
          />

          {/* Company Return Filing Routes */}
          <Route
            path="/company-return-filing"
            element={<CompanyReturnFiling />}
          />
          <Route
            path="/company-return-filing/view/:id"
            element={<ViewCompanyReturn />}
          />

          {/* NTN Management Routes */}
          <Route path="/ntn" element={<NTNList />} />
          <Route path="/ntn/view/:id" element={<ViewNTN />} />

          {/* FAQ Routes */}
          <Route path="/faqs" element={<FAQList />} />
          <Route path="/faqs/new" element={<FAQForm />} />
          <Route path="/faqs/edit/:id" element={<FAQForm />} />
          <Route path="/faqs/view/:id" element={<ViewFAQ />} />
        </Route>

        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
