import { createInvestor, IListInvestor } from "../utils";
import RequestAdmin from "./request/RequestAdmin";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const getListInvestor = async (
  body: IListInvestor,
  access_token: string
) => {
  const { search, stages_id, page_number, page_size } = body;
  const { data } = await RequestAdmin.get(
    `${serverEndpoint}/investors?page_number=${page_number}&page_size=${page_size}&search=${search}&stages_id=${stages_id}`,
    undefined,
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

export const getListStage = async () => {
  const { data } = await RequestAdmin.get(
    `${serverEndpoint}/rounds/list-stage`
  );
  return data;
};
