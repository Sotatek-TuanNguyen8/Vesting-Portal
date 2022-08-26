import axios from "axios";
import { handleErrorUtilAdmin } from "../../utils/handle-error";

class RequestAdmin {
  instance;
  constructor() {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    instance.interceptors.request.use(
      async (config: any) => {
        const accessToken = sessionStorage.getItem("access_token") as string;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error: any) => {
        Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      function (response: any) {
        return handleErrorUtilAdmin(response);
      },
      function (error: any) {
        if (error.response) {
          return handleErrorUtilAdmin(error.response);
        }
        return Promise.reject(error);
      }
    );

    this.instance = instance;
  }

  get = (url: string, params?: object, accessToken?: any) => {
    if (accessToken) {
      this.instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }
    return this.instance.get(url, { params });
  };

  post = (url: string, data?: object, headers?: any) => {
    if (headers) {
      this.instance.defaults.headers.common["msgsignature"] = headers;
    }
    return this.instance.post(url, data);
  };

  put = (url: string, data?: object) => {
    return this.instance.put(url, data);
  };

  patch = (url: string, data: object) => {
    return this.instance.patch(url, data);
  };

  delete = (url: string, data?: object) => {
    return this.instance.delete(url, { data });
  };
}

export default new RequestAdmin();
