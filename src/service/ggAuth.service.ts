import { IVerify2FA } from "../classes/ggAuthenticator";
import Request from "./request/Request";

const serverEndpoint = process.env.REACT_APP_API_BASE_URL;

export const generateSecret = async () => {
  try {
    const { data } = await Request.post(
      `${serverEndpoint}/google-2fa/generate`
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};

export const verify2FA = async (value: IVerify2FA) => {
  try {
    const { data } = await Request.post(
      `${serverEndpoint}/google-2fa/verify`,
      value
    );
    return [data, null];
  } catch (error: any) {
    return [null, error.data];
  }
};
