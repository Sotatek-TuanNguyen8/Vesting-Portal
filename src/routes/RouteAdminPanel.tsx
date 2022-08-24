import { Route, Routes } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";
import Investors from "../components/AdminPanel/Adminstration/Investor";
import Tokenomics from "../components/AdminPanel/Adminstration/Tokenomics";
export const RouteAdminPanel = () => {
  let role = "admin";
  return role === "admin" ? <AdminPrivateRoute /> : <UserPrivateRoute />;
};

export const AdminPrivateRoute = () => {
  return (
    <Routes>
      <Route path="/admin-panel/investor" element={<Investors />} />
      <Route path="/admin-panel/tokenomics" element={<Tokenomics />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
    </Routes>
  );
};

export const UserPrivateRoute = () => {
  return (
    <Routes>
      <Route path="/user-profile" element={<AdminPanel />} />
    </Routes>
  );
};
