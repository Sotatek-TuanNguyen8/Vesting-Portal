// export const networkParam = {

import _ from "lodash";

// }

const INFURA_KEY = process.env.REACT_PUBLIC_INFURA_KEY;
const ETH = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};
export const rykenBy = {
  chainId: 4,
  chainName: "Rinkeby",
  rpcUrls: _.compact([
    INFURA_KEY ? `https://rinkeby.infura.io/v3/${INFURA_KEY}` : undefined,
  ]),
  nativeCurrency: ETH,
};
