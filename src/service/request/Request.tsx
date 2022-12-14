import axios from "axios";
import handleErrorUtil from "../../app/ultils/handle-error";

class Request {
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
        const accessToken = localStorage.getItem("access_token");
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
        return handleErrorUtil(response);
      },
      function (error: any) {
        if (error.response) {
          return handleErrorUtil(error.response);
        }
        return Promise.reject(error);
      }
    );

    this.instance = instance;
  }

  get = (url: string, params?: object) => {
    return this.instance.get(url, { params });
  };

  post = (url: string, data?: object, headers?: any) => {
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

export default new Request();
