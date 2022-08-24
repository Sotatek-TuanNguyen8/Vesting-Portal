import { createInvestor } from "../utils";
import RequestAdmin from "./request/RequestAdmin";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const getListInvestor = async (access_token: string) => {
  const { data } = await RequestAdmin.get(
    `${serverEndpoint}/investors`,
    {},
    access_token
  );
  return data;
};

export const createInvestorNew = async (body: createInvestor) => {
  const response = await RequestAdmin.post(`${serverEndpoint}/investors`, body);
  return response;
};
