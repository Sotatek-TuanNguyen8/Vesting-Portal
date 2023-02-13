import Request from "./request/Request";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const getInfoClaim = async (id: number) => {
  try {
    const { data } = await Request.get(
      `${serverEndpoint}/rounds/${id}/claim-token-info`
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const getListJoinClaim = async () => {
  try {
    const { data } = await Request.get(`${serverEndpoint}/rounds/joined`);
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const getClaimList = async (id: number) => {
  try {
    const { data } = await Request.get(
      `${serverEndpoint}/rounds/${id}/claimed`
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const postStatusClaim = async (id: number) => {
  try {
    const { data } = await Request.patch(
      `${serverEndpoint}/rounds/investor/${id}/update-claim-status`
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};
