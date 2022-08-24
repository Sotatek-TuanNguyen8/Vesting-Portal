import Request from "./request/Request";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

interface IGetInfoClaim {}

export const getInfoClaim = async (body: IGetInfoClaim) => {
  const { data } = await Request.post(`${serverEndpoint}/auth/login`, body);
  return data;
};
