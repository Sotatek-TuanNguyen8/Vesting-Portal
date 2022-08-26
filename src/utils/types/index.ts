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

export interface IListInvestor {
  search: string;
  stages_id: string[];
  page_number: number;
  page_size: number;
}

export interface loginWallet {
  signature: string;
  wallet_address: string;
}
