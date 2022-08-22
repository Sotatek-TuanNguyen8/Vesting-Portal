import { Route, Routes } from "react-router-dom";
import EmailConfirmPage from "../components/Auth/email-confirm";
import ForgotPasswordPage from "../components/Auth/forgot-password";
import ResendEmailPage from "../components/Auth/resend-email";
import SignInPage from "../components/Auth/sign-in";
import SignUpPage from "../components/Auth/sign-up";
import ConnectWalletPage from "../components/connect-wallet";
import HomePage from "../components/Home";
import Claiming from "../pages/Claiming";
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
      <Route path="/claiming" element={<Claiming />} />
      <Route path="/*" element={<>404! Not Found</>} />
    </Routes>
  );
};
