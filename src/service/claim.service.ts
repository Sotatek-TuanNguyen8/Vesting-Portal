import Request from "./request/Request";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

interface IGetInfoClaim {}

export const getInfoClaim = async (body: IGetInfoClaim) => {
  const { data } = await Request.post(`${serverEndpoint}`, body);
  return data;
};
