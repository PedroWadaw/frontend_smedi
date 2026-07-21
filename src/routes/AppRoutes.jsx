import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import RegisterOrganization from "../pages/RegisterOrganization";
import RegisterMember from "../pages/RegisterMember";
import Redirect from "../pages/Redirect";
import CollectingDataMember from "../pages/CollectingDataMember";
import Success from "../pages/Success";
import MainLayout from "../pages/Layout/MainLayout";
import NotFound from "../pages/404/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import QrCode from "../pages/Dashboard/Mobile/QrCode";
import UpdateAccountPage from "../pages/Dashboard/UpdateAccountPage";
import UpdateProfilePage from "../pages/Dashboard/UpdateProfilePage";
import History from "../pages/Dashboard/History";
import Account from "../pages/Dashboard/Account";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import ScanMerchant from "../pages/TA/ScanMerchant";
import InputNominal from "../pages/TA/InputNominal";
import Payment from "../pages/TA/Payment";
import LoginDevice from "../pages/TA/LoginScan";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/account" element={<Account />} />
        <Route path="/qrcode" element={<QrCode />} />
      </Route>

      <Route path="/update-account" element={<UpdateAccountPage />} />
      <Route path="/update-profile" element={<UpdateProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/redirect" element={<Redirect />} />
      <Route path="/register" element={<RegisterMember />} />
      <Route path="/register-org" element={<RegisterOrganization />} />
      <Route path="/success" element={<Success />} />
      <Route path="/create-profile-member" element={<CollectingDataMember />} />

      <Route path="*" element={<NotFound />} />
      <Route path="scan" element={<ScanMerchant />} />
      <Route path="input" element={<InputNominal />} />
      <Route path="payment" element={<Payment />} />
      <Route path="login-dev" element={<LoginDevice />} />
    </Routes>
  );
}