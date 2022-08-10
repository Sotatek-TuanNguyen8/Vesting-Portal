import Request from "./request/Request";

const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

interface IAuthData {
  email: string;
  password: string;
}

interface ISignInData extends IAuthData {}

export const authService = {
  signIn: async (data: ISignInData) => {
    try {
      const response = await Request.post(`${serverEndpoint}`, data);
      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  },
};
