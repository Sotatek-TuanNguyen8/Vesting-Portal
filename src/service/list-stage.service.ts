import RequestAdmin from "./request/RequestAdmin";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const getListStage = async () => {
  const { data } = await RequestAdmin.get(
    `${serverEndpoint}/rounds/list-stage`
  );
  return data;
};
