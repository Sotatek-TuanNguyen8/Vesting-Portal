import _ from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { AppRouter } from "./routes";
import { routeSupported, routeAdminSupported } from "./utils/types/route";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const windowObj: any = window;
    windowObj?.ethereum?.on("accountsChanged", (accounts: string[]) => {
      const { pathname } = window.location;
      if (
        _.findIndex(routeSupported, (el) => {
          return el === pathname;
        }) !== -1
      ) {
        localStorage.removeItem("access_token");
        navigate("/sign-in");
      }
      if (
        _.findIndex(routeAdminSupported, (el) => {
          return el === pathname;
        }) !== -1
      ) {
        sessionStorage.removeItem("access_token");
        navigate("/admin-panel");
      }
      localStorage.setItem("accounts", accounts[0]);
    });

    windowObj?.ethereum?.on("networkChanged", (chainId: string) => {});
  }, [navigate]);

  return <AppRouter></AppRouter>;
};

export default App;
