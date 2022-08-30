import {
  createInvestor,
  editTokennomics,
  IListInvestor,
  IListTokenomic,
} from "../utils";
import RequestAdmin from "./request/RequestAdmin";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const getListInvestor = async (
  body: IListInvestor,
  access_token: string,
) => {
  const { search, stages_id, page_number, page_size } = body;
  const { data } = await RequestAdmin.get(
    `${serverEndpoint}/investors?page_number=${page_number}&page_size=${page_size}&search=${search}&${stages_id
      ?.map((el) => `stages_id=${el}`)
      .join("&")}`,
    undefined,
    access_token,
  );
  return data;
};

export const createInvestorNew = async (body: createInvestor) => {
  const response = await RequestAdmin.post(`${serverEndpoint}/investors`, body);
  return response;
};

export const updateInvestorNew = async (id: number | string, data: any) => {
  const response = await RequestAdmin.patch(
    `${serverEndpoint}/investors/${id}`,
    data,
  );
  return response;
};

export const getListStage = async () => {
  const { data } = await RequestAdmin.get(
    `${serverEndpoint}/rounds/list-stage`,
  );
  return data;
};

export const deleteInvestor = async (id: number) => {
  const response = await RequestAdmin.delete(
    `${serverEndpoint}/investors/${id}`,
  );
  return response;
};
export const getDataTokenomics = async (
  body: IListTokenomic,
  access_token: string,
) => {
  const { page_number, page_size } = body;
  const { data } = await RequestAdmin.get(
    `${serverEndpoint}/rounds?page_number=${page_number}&page_size=${page_size}`,
    undefined,
    access_token,
  );
  return data;
};

export const editTableTokenimics = async (
  id: number,
  body: editTokennomics,
) => {
  const { data } = await RequestAdmin.patch(
    `${serverEndpoint}/rounds/${id}`,
    body,
  );
  return data;
};
export const addTokenomics = async (body: editTokennomics) => {
  const { data } = await RequestAdmin.post(`${serverEndpoint}/rounds`, body);
  return data;
};
export const deleteTokenomics = async (id: number) => {
  const { data } = await RequestAdmin.delete(`${serverEndpoint}/rounds/${id}`);
  return data;
};

export const getRootData = async () => {
  const { data } = await RequestAdmin.get(`${serverEndpoint}/root-data`);
  return data;
};
export const postGenerageData = async () => {
  const { data } = await RequestAdmin.post(
    `${serverEndpoint}/root-data/generate`,
  );
  return data;
};
export const updateRoot = async () => {
  const { data } = await RequestAdmin.patch(`${serverEndpoint}/root-data`,{});
  return data;
};
