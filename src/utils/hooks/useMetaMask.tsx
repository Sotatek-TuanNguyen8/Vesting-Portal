import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import * as React from "react";
import { toast } from "react-toastify";
import { CHAIN_ID_SUPPORT } from "../chainID";
export const MetaMaskContext = React.createContext(null);

export const injectedConnector = new InjectedConnector({
  // supportedChainIds: chainIDS,
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
  } = useWeb3React();
  const [isActive, setIsActive] = React.useState(false);

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
      toast.error("Disconnect error");
    }
  };

  const getSignature = async (message: string, libraryWeb3: any) => {
    if (!libraryWeb3) return;
    try {
      const signature = await libraryWeb3?.provider.request({
        method: "personal_sign",
        params: [message, account],
      });
      return signature;
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const switchNetwork = async () => {
    if (Number(chainId) === Number(CHAIN_ID_SUPPORT)) return;
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(CHAIN_ID_SUPPORT).toString(16)}` }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${Number(CHAIN_ID_SUPPORT).toString(16)}`,
                rpcUrls: [process.env.REACT_APP_RPC as string],
                chainName: process.env.REACT_APP_CHAIN_NAME as string,
                nativeCurrency: {
                  name: `${process.env.REACT_APP_CHAIN_NAME as string} Ether`,
                  symbol: `${process.env.REACT_APP_CHAIN_NAME as string}ETH`,
                  decimals: 18,
                },
                blockExplorerUrls: [process.env.REACT_APP_URL_SCAN as string],
              },
            ],
          });
        } catch (error: any) {
          toast.error("Add network error");
        }
      } else {
        toast.warning("You denied the switch network");
        return switchError.code;
      }
    }
  };

  const wrongNetWork =
    chainId && Boolean(chainId?.toString() !== CHAIN_ID_SUPPORT.toString());

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
