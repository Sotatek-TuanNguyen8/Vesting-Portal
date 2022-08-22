import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const UnauthorizedCallback = () => {
  toast.error("Unauthorized");
};

let timeoutFlag: NodeJS.Timeout;

const handleErrorUtil = (response: AxiosResponse<any>) => {
  const { status } = response;
  switch (status) {
    case 401:
      clearTimeout(timeoutFlag);
      timeoutFlag = setTimeout(UnauthorizedCallback, 1500);
      localStorage.removeItem("access_token");
      return;
    case 500:
      toast.error("Server error");
      return;
    default:
      return response;
  }
};

export default handleErrorUtil;
