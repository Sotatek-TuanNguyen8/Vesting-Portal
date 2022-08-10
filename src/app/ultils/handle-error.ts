import { AxiosResponse } from "axios";

const UnauthorizedCallback = () => {
  alert("Unauthorized");
};

let timeoutFlag: NodeJS.Timeout;

const handleErrorUtil = (response: AxiosResponse<any>) => {
  const { status } = response;
  switch (status) {
    case 401:
      clearTimeout(timeoutFlag);
      timeoutFlag = setTimeout(UnauthorizedCallback, 1500);
      return {
        ...response,
        data: {
          ...response.data,
          message: null,
        },
      };
    default:
      return response;
  }

  return response;
};

export default handleErrorUtil;
