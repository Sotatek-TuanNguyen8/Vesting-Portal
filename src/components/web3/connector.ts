import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const connectors = {
  injected: injected,
};

export const TRANSACTION_TIMEOUT = 1 * 60 * 1000;
