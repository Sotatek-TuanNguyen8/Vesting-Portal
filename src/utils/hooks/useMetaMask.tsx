import * as React from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

export const MetaMaskContext = React.createContext(null);

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
  const [isLoading, setIsLoading] = React.useState(true);

  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  // Connect to MetaMask wallet
  const connect = React.useCallback(async () => {
    try {
      await activate(injectedConnector);
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  }, [activate]);

  // Init Loading
  React.useEffect(() => {
    connect().then((val) => {
      setIsLoading(false);
    });
  }, [connect]);

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

  const values: any = {
    isActive,
    account,
    isLoading,
    library,
    error,
    connect,
    disconnect,
    setError,
    chainId,
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
