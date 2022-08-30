import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const UnauthorizedCallback = () => {
  toast.error("Unauthorized");
};

let timeoutFlag: NodeJS.Timeout;

export const handleErrorUtil = (response: AxiosResponse<any>) => {
  const { status } = response;
  if (status >= 500) {
    toast.error("Server error");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/sign-in";
    return;
  }
  switch (status) {
    case 401:
      clearTimeout(timeoutFlag);
      timeoutFlag = setTimeout(UnauthorizedCallback, 1500);
      localStorage.removeItem("access_token");
      window.location.href = "/sign-in";
      return;
    default:
      return response;
  }
};

export const handleErrorUtilAdmin = (response: AxiosResponse<any>) => {
  const { status } = response;
  if (status >= 500) {
    toast.error("Server error");
    localStorage.clear();
    sessionStorage.clear();
    if (window.location.pathname !== "/admin-panel") {
      window.location.href = "/admin-panel";
    }
    return;
  }
  switch (status) {
    case 401:
      localStorage.clear();
      sessionStorage.clear();
      if (window.location.pathname !== "/admin-panel") {
        window.location.href = "/admin-panel";
      }
      return;
    default:
      return response;
  }
};
