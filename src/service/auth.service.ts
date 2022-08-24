import {
  confirmEmailBody,
  createInvestor,
  forgotPWBody,
  loginBody,
  resendEmailBody,
  resetPWBody,
  singUpBody,
  updateWallet,
  loginWallet,
} from "../utils";
import Request from "./request/Request";
import RequestAdmin from "./request/RequestAdmin";

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

export const createInvestorNew = async (body: createInvestor) => {
  const response = await Request.post(`${serverEndpoint}/investors`, body);
  return response;
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

export const getInfoUser = async (access_token: string) => {
  const { data } = await Request.get(
    `${serverEndpoint}/users/me`,
    {},
    access_token
  );
  return data;
};

export const loginAdmin = async (body: loginWallet, header?: string) => {
  const { data } = await RequestAdmin.post(
    `${serverEndpoint}/auth/admin/login`,
    body,
    header
  );
  return data;
};

export const getListInvestor = async (access_token: string) => {
  const { data } = await Request.get(
    `${serverEndpoint}/investors`,
    {},
    access_token
  );
  return data;
};
