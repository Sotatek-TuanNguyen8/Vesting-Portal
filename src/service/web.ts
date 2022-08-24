import Web3 from "web3";

export const NETWORK_URL = process.env.REACT_APP_NETWORK_URL || "";

export const getContractConnect = async (abi: any, address: string) => {
  const web3 = new Web3(Web3.givenProvider || NETWORK_URL);
  const res = await new web3.eth.Contract(abi, address);
  return res;
};
