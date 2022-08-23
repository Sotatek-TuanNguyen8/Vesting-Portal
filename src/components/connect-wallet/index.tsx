import { Box, ButtonBase, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Error } from "../../assets/svgs";
import { updateWalletAuth } from "../../service";
import { AppDispatch } from "../../store";
import {
  fetchInfoUser,
  setUser,
  signUpResendSuccess,
} from "../../store/action";
import { scrollIntoView } from "../../utils/common/fn";
import useMetaMask from "../../utils/hooks/useMetaMask";
import InvestorLayout from "../layouts/InvestorLayout";
import useStyles from "./style";

export default function ConnectWalletPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { getSignature, connect, account } = useMetaMask();
  const userData = useSelector((s: any) => s.authAction.data);
  const [errorCheckAddress, setErrorCheckAddress] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [checkFetchData, setCheckFetchData] = useState<boolean>(false);
  const elRef = useRef(null);

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
      if (!userData?.metamaskAddress) {
        const signature = await getSignature("ConnectWallet");
        if (signature) {
          const res = await updateWalletAuth({
            signature: signature,
            wallet_address: account,
          });
          if (res?.error) {
            setErrorCheckAddress(
              "This wallet has been connected to another account"
            );
          } else {
            dispatch(setUser({ ...userData, metamaskAddress: account }));
            navigate("/");
          }
        }
      } else {
        if (
          accountWallet?.toLowerCase() ===
          userData?.metamaskAddress?.toLowerCase()
        ) {
          navigate("/");
        } else {
          setErrorCheckAddress("Email and Wallet address do not match");
        }
      }
    }
  };

  useEffect(() => {
    scrollIntoView(elRef);
  }, []);

  return (
    <div ref={elRef}>
      <InvestorLayout isNav={false}>
        <Container maxWidth="lg" sx={{ margin: "auto" }}>
          <Box
            width="fit-content"
            sx={{
              background:
                " linear-gradient(134.72deg, #F3E8FF -2.3%, #FCFEFF 32.48%, #E8F9FF 100%)",
              borderRadius: "10px",
              minWidth: "546px",
              padding: "28px 45px",
              margin: "auto",
              minHeight: 530,
            }}
          >
            <Typography variant="h4" color="#0A208F" pb={5}>
              Connect Wallet
            </Typography>
            {errorCheckAddress && (
              <Typography
                // variant="subtitle1"
                color="#F44336"
                fontSize={"14px!important"}
                pb={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Error width={16} height={16} style={{ marginRight: "5px" }} />{" "}
                {errorCheckAddress}
              </Typography>
            )}
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
              }}
            >
              {[
                ["metamask", "Metamask"],
                //   ["coinbase", "Coinbase Wallet"],
              ].map(([type, label]) => (
                <ButtonBase
                  className={classes.buttonWallet}
                  sx={{
                    transition: (theme) =>
                      theme.transitions.create("background-color"),
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" },
                    "& > img": { mb: 2 },
                  }}
                  key={type}
                  // @ts-ignore
                  onClick={handleConnectWallet}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "18px",
                      fonColor: "#050025",
                      fontWeight: "500!important",
                    }}
                  >
                    {label}
                  </Typography>
                  <img
                    src={`/images/${type}.svg`}
                    alt={type}
                    width={60}
                    height={60}
                  />
                </ButtonBase>
              ))}
            </Box>
          </Box>
        </Container>
      </InvestorLayout>
    </div>
  );
}
