import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
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

const App = () => {
  console.log("App component rendered");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

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
        </Route>

        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
