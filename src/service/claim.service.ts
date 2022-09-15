import Request from "./request/Request";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const getInfoClaim = async (id: number) => {
  const { data } = await Request.get(
    `${serverEndpoint}/rounds/${id}/claim-token-info`
  );
  return data;
};

export const getListJoinClaim = async () => {
  const { data } = await Request.get(`${serverEndpoint}/rounds/joined`);
  return data;
};

export const getClaimList = async (id: number) => {
  const { data } = await Request.get(`${serverEndpoint}/rounds/${id}/claimed`);
  return data;
};

export const postStatusClaim = async (id: number) => {
  const { data } = await Request.patch(
    `${serverEndpoint}/rounds/investor/${id}/update-claim-status`
  );
  return data;
};
