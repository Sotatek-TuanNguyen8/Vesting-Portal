import _ from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { AppRouter } from "./routes";
import { resetUser } from "./store/action";
import { routeAdminSupported, routeSupported } from "./utils/types/route";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const windowObj: any = window;
    windowObj?.ethereum?.on("accountsChanged", (accounts: string[]) => {
      const { pathname } = window.location;
      if (
        _.findIndex(routeSupported, (el) => {
          return el === pathname;
        }) !== -1
      ) {
        dispatch(resetUser());
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
  }, [dispatch, navigate]);

  return <AppRouter></AppRouter>;
};

export default App;
