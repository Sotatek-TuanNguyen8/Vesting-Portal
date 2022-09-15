import { Web3Provider } from "@ethersproject/providers";
import { ThemeProvider } from "@material-ui/core";
import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { SocketProvider } from "./components/hooks/useSocket";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { theme } from "./Theme";
import { MetaMaskProvider } from "./utils";

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

ReactDOM.render(
  <React.StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MetaMaskProvider>
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                <App />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </ThemeProvider>
            </Provider>
          </MetaMaskProvider>
        </Web3ReactProvider>
      </BrowserRouter>
    </SocketProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
