export interface IGGAuthenticator {
  secret: string;
  otpAuth: string;
}

export const enum STEP {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
}

export interface IStep {
  label: string;
  value: STEP;
}

export interface IVerify2FA {
  secret: string;
  token: string;
}
