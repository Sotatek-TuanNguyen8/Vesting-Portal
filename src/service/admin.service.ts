import { createInvestor } from "../utils";
import RequestAdmin from "./request/RequestAdmin";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const getListInvestor = async (
  access_token: string,
  page_number: number
) => {
  const { data } = await RequestAdmin.get(
    `${serverEndpoint}/investors?page_number=${page_number}`,
    {},
    access_token
  );
  return data;
};

export const createInvestorNew = async (body: createInvestor) => {
  const response = await RequestAdmin.post(`${serverEndpoint}/investors`, body);
  return response;
};

export const updateInvestorNew = async (id: number | string, data: {}) => {
  const response = await RequestAdmin.patch(
    `${serverEndpoint}/investors/${id}`,
    data
  );
  return response;
};

export const deleteInvestor = async (id: number) => {
  const response = await RequestAdmin.delete(
    `${serverEndpoint}/investors/${id}`
  );
  return response;
};
