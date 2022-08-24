import { Route, Routes } from "react-router-dom";
import AdminAuthPage from "../components/admin-auth";
import Investors from "../components/AdminPanel/Adminstration/Investor";
import Tokenomics from "../components/AdminPanel/Adminstration/Tokenomics";
import EmailConfirmPage from "../components/Auth/email-confirm";
import ForgotPasswordPage from "../components/Auth/forgot-password";
import ResendEmailPage from "../components/Auth/resend-email";
import ResetPasswordPage from "../components/Auth/reset-password";
import SignInPage from "../components/Auth/sign-in";
import SignUpPage from "../components/Auth/sign-up";
import NotFoundPage from "../components/common/NotFound";
import ConnectWalletPage from "../components/connect-wallet";
import HomePage from "../components/Home";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/resend-email" element={<ResendEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/email-confirm" element={<EmailConfirmPage />} />
      <Route path="/connect-wallet" element={<ConnectWalletPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/admin-panel/investor" element={<Investors />} />
      <Route path="/admin-panel/tokenomics" element={<Tokenomics />} />
      <Route path="/admin-panel" element={<AdminAuthPage />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};
