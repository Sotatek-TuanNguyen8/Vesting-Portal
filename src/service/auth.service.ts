import {
  confirmEmailBody,
  forgotPWBody,
  getInfo,
  loginBody,
  resendEmailBody,
  resetPWBody,
  singUpBody,
  updateWallet,
} from "../utils";
import Request from "./request/Request";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const authService = {
  signUp: async (body: singUpBody) => {
    const response = await Request.post(
      `${serverEndpoint}/auth/register`,
      body
    );
    return response.data;
  },
};

export const loginAuth = async (body: loginBody) => {
  const { data } = await Request.post(`${serverEndpoint}/auth/login`, body);
  return data;
};

export const confirmEmailAuth = async (body: confirmEmailBody) => {
  const { data } = await Request.post(
    `${serverEndpoint}/auth/confirm-email`,
    body
  );
  return data;
};

export const resendEmailAuth = async (body: resendEmailBody) => {
  const { data } = await Request.post(
    `${serverEndpoint}/auth/re-send-confirm-email`,
    body
  );
  return data;
};

export const forgotPWlAuth = async (body: forgotPWBody, header?: string) => {
  const { data } = await Request.post(
    `${serverEndpoint}/auth/forgot-password`,
    body,
    header
  );
  return data;
};

export const resetPWlAuth = async (body: resetPWBody) => {
  const { data } = await Request.post(
    `${serverEndpoint}/auth/password-reset`,
    body
  );
  return data;
};

export const updateWalletAuth = async (body: updateWallet) => {
  const { data } = await Request.post(`${serverEndpoint}/users/wallet`, body);
  return data;
};

export const getInfoUser = async (body: getInfo) => {
  const { data } = await Request.post(`${serverEndpoint}/users/wallet`, body);
  return data;
};
