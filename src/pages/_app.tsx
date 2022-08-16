import { MetaMaskProvider } from "@/utils/hooks/useMetaMask";
import { ThemeProvider } from "@material-ui/core";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/globals.scss";
import { theme } from "../Theme";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    // window?.ethereum?.on("accountsChanged", (accounts: string[]) => {
    //   // dispatch(setAddress());
    //   router.push("/");
    // });
    // window?.ethereum?.on("networkChanged", (chainId: string) => {
    //   dispatch(setChainId(chainId));
    // });
  }, [router]);

  const getLibrary = (provider: any) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </MetaMaskProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
