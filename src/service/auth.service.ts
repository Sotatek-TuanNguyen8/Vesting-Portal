import {
  confirmEmailBody,
  forgotPWBody,
  loginBody,
  resendEmailBody,
  resetPWBody,
  singUpBody,
  updateWallet,
} from "../utils";
import { ICheckTokenValid, loginWallet } from "./../utils/types/index";
import Request from "./request/Request";
import RequestAdmin from "./request/RequestAdmin";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const authService = {
  signUp: async (body: singUpBody) => {
    try {
      const { data } = await Request.post(
        `${serverEndpoint}/auth/register`,
        body
      );
      return [data, null];
    } catch (error: any) {
      return [null, error.data];
    }
  },
};

export const loginAuth = async (body: loginBody) => {
  try {
    const { data } = await Request.post(`${serverEndpoint}/auth/login`, body);
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const confirmEmailAuth = async (body: confirmEmailBody) => {
  try {
    const { data } = await Request.post(
      `${serverEndpoint}/auth/confirm-email`,
      body
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const resendEmailAuth = async (body: resendEmailBody) => {
  try {
    const { data } = await Request.post(
      `${serverEndpoint}/auth/re-send-confirm-email`,
      body
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const forgotPWlAuth = async (body: forgotPWBody, header?: string) => {
  try {
    const { data } = await Request.post(
      `${serverEndpoint}/auth/forgot-password`,
      body,
      header
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const resetPWlAuth = async (body: resetPWBody) => {
  try {
    const { data } = await Request.post(
      `${serverEndpoint}/auth/password-reset`,
      body
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const updateWalletAuth = async (body: updateWallet) => {
  try {
    const { data } = await Request.post(`${serverEndpoint}/users/wallet`, body);
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const getInfoUser = async (access_token: string) => {
  try {
    const { data } = await Request.get(
      `${serverEndpoint}/users/me`,
      {},
      access_token
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const checkTokenValid = async (body: ICheckTokenValid) => {
  try {
    const { data } = await Request.post(
      `${serverEndpoint}/auth/check-token-valid`,
      body
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const loginAdmin = async (body: loginWallet, header?: string) => {
  const { data } = await RequestAdmin.post(
    `${serverEndpoint}/auth/admin/login`,
    body,
    header
  );
  return data;
};
