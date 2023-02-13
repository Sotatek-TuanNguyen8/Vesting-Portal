import { Box, ButtonBase, Container, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error } from "../../assets/svgs";
import { updateWalletAuth } from "../../service";
import {
  fetchInfoUser,
  setUser,
  signUpResendSuccess,
} from "../../store/action";
import { useAppDispatch, useAppSelector } from "../../store/reducers";
import { scrollIntoView } from "../../utils/common/fn";
import { CONNECT_WALLET } from "../../utils/common/message-sign";
import useMetaMask from "../../utils/hooks/useMetaMask";
import InvestorUserLayout from "../layouts/InvestorUserLayout";
import useStyles from "./style";

export default function ConnectWalletPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { getSignature, connect, account } = useMetaMask();
  const { library } = useWeb3React();
  const userData = useAppSelector((s) => s.authReducer.data);
  const [errorCheckAddress, setErrorCheckAddress] = useState("");
  const dispatch = useAppDispatch();
  const [checkFetchData, setCheckFetchData] = useState<boolean>(false);
  const [checkConnect, setCheckConnect] = useState<boolean>(false);
  const elRef = useRef(null);

  useEffect(() => {
    if (!account || !library || !checkFetchData || !checkConnect) return;
    (async () => {
      if (!userData?.metamaskAddress) {
        const signature = await getSignature(CONNECT_WALLET, library);
        if (signature) {
          const [res] = await updateWalletAuth({
            signature: signature,
            wallet_address: account,
          });
          if (res) {
            dispatch(setUser({ ...userData, metamaskAddress: account }));
            navigate("/");
          } else {
            setErrorCheckAddress(
              "This wallet has been connected to another account"
            );
          }
        }
      }
      setCheckConnect(false);
    })();
  }, [
    account,
    library,
    checkFetchData,
    userData,
    getSignature,
    dispatch,
    navigate,
    checkConnect,
  ]);

  useEffect(() => {
    (async () => {
      const item = localStorage.getItem("access_token");
      if (!item) {
        navigate("/sign-in");
      } else {
        setCheckFetchData(false);
        await dispatch(fetchInfoUser(item));
        setCheckFetchData(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, localStorage.getItem("access_token")]);

  useEffect(() => {
    if (!checkFetchData || !account) return;
    if (!userData.isVerify) {
      dispatch(
        signUpResendSuccess({
          email: userData?.email,
          type: "sign-in",
        })
      );
      navigate("/resend-email");
      return;
    }
  }, [account, checkFetchData, dispatch, navigate, userData]);

  useEffect(() => {
    if (!account) return;
    localStorage.setItem("accounts", account);
  }, [account]);

  const handleConnectWallet = async () => {
    setErrorCheckAddress("");
    if (!account) {
      await connect();
    } else {
      const accountWallet = localStorage.getItem("accounts");
      if (userData?.metamaskAddress) {
        if (
          accountWallet?.toLowerCase() ===
          userData?.metamaskAddress?.toLowerCase()
        ) {
          navigate("/");
        } else {
          setErrorCheckAddress("Email and Wallet address do not match");
        }
      } else {
        setCheckConnect(true);
      }
    }
  };

  useEffect(() => {
    scrollIntoView(elRef);
  }, []);

  return (
    <div ref={elRef}>
      <InvestorUserLayout isNav={false} notShowInfo={true}>
        <Container
          maxWidth="lg"
          sx={{ margin: "auto" }}
          className={classes.container}
        >
          <Box width="fit-content" className="boxConnect">
            <Typography variant="h4" pb={5}>
              Connect Your Vesting Wallet
            </Typography>
            <span>
              Please choose the wallet below that you confirmed for Vesting.
            </span>
            {errorCheckAddress && (
              <Typography
                color="#F44336"
                fontSize={"14px!important"}
                pb={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Error width={16} height={16} style={{ marginRight: "5px" }} />{" "}
                <span className={classes.error}>{errorCheckAddress}</span>
              </Typography>
            )}
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
              }}
              className={classes.box}
            >
              {[["metamask", "Metamask"]].map(([type, label]) => (
                <ButtonBase
                  className={classes.buttonWallet}
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create("background-color"),
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                    "& > img": { mb: 2 },
                  }}
                  key={type}
                  onClick={handleConnectWallet}
                >
                  <Typography variant="body1">{label}</Typography>
                  <img
                    src={`/images/${type}.svg`}
                    alt={type}
                    width={50}
                    height={50}
                  />
                </ButtonBase>
              ))}
            </Box>
          </Box>
        </Container>
      </InvestorUserLayout>
    </div>
  );
}
