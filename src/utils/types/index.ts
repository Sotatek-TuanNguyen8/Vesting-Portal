export interface loginBody {
  email: string;
  password: string;
}

export interface confirmEmailBody {
  email: string;
  code: string;
}

export interface resendEmailBody {
  email: string;
}

export interface singUpBody {
  full_name: string;
  password: string;
  email: string;
}

export interface forgotPWBody {
  email: string;
  signature?: string;
  wallet_address?: string;
}

export interface resetPWBody {
  email: string;
  password: string;
  token: string;
}
export interface updateWallet {
  signature: string;
  wallet_address: string;
}

export interface createInvestor {
  wallet_address: string;
}

export interface updateInvestor {
  id: number | string;
  data: any;
}

export interface getInfo {}

export interface loginWallet {
  signature: string;
  wallet_address: string;
}
export interface editTokennomics {
  name: string;
  token_amount: string;
  tge_amount: string;
  cliff: number;
  linear_vesting: number;
}
