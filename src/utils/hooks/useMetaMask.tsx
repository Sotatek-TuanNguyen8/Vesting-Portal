import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CHAIN_ID } from "../chains";
import { WrongNetworkDialog } from "./WrongNetWorkDialog";
export const MetaMaskContext = React.createContext(null);

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337, 43114],
});

export const MetaMaskProvider = ({ children }: any) => {
  const {
    activate,
    account,
    active,
    deactivate,
    library,
    setError,
    error,
    chainId,
    connector,
  } = useWeb3React();
  const [isActive, setIsActive] = React.useState(false);
  const location = useLocation();
  const { pathname } = location;
  const checkRounterConnect = pathname === "/connect-wallet";

  React.useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !active && !error) {
          activate(injectedConnector);
        }
      })
      .catch(() => {});
  }, [active, activate, error]);

  // check not install extension MetaMask
  const isMetaMask = () => {
    const windowObj: any = window;
    return !!windowObj?.ethereum || !!windowObj?.ethereum?.isMetaMask;
  };

  // Connect to MetaMask wallet
  const connect = React.useCallback(async () => {
    if (!isMetaMask()) {
      toast.error("Please install extension MetaMask");
      window.open("https://metamask.io/");
    } else {
      try {
        await activate(injectedConnector);
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
  }, [activate]);

  // Init Loading

  const handleIsActive = React.useCallback(() => {
    setIsActive(active);
  }, [active]);

  React.useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    try {
      await deactivate();
    } catch (error) {
      console.log("Error on disconnecting: ", error);
    }
  };

  const getSignature = async (message: string) => {
    if (!library) return;
    try {
      const signature = await library?.provider.request({
        method: "personal_sign",
        params: [message, account],
      });
      return signature;
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const switchNetwork = async () => {
    if (chainId !== 4) return;
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x4",
                rpcUrls: ["https://rinkeby.infura.io/v3/"],
                chainName: "Rinkeby",
                nativeCurrency: {
                  name: "Rinkeby Ether",
                  symbol: "RIN",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://rinkeby.etherscan.io"],
              },
            ],
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const wrongNetWork = isActive ? chainId !== CHAIN_ID : false;

  const values: any = {
    isActive,
    account,
    library,
    error,
    connect,
    disconnect,
    setError,
    chainId,
    getSignature,
    isMetaMask,
    switchNetwork,
    wrongNetWork,
  };

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
      {/* <WrongNetworkDialog
        open={Boolean(connector) && wrongNetWork && checkRounterConnect}
      /> */}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context: any = React.useContext(MetaMaskContext);

  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
