import { ThemeProvider } from "@material-ui/core";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import "../styles/globals.scss";
import { theme } from "../Theme";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log("hlloe");
    localStorage.setItem("access_token", "1234");
    return () => {
      true && localStorage.removeItem("access_token");
    };
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
