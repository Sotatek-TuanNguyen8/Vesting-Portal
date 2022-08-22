import _ from "lodash";

declare var window: any;
export const hasWallet = (type: any) => {
  if (!isClient()) return false;

  // @ts-ignore
  const providers: any[] = window?.ethereum?.providers;

  // user installed both metamask and coinbase
  if (_.isArray(providers)) return true;

  if (type === "metamask") {
    return window?.ethereum?.isMetaMask;
  }

  if (type === "coinbase") {
    // @ts-ignore
    return window?.ethereum?.isCoinbaseWallet;
  }

  return true;
};
export const isClient = () => {
  return typeof window !== "undefined";
};
