import { Box, ButtonBase, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Error } from "../../assets/svgs";
import { updateWalletAuth } from "../../service";
import { setUser } from "../../store/action";
import useMetaMask from "../../utils/hooks/useMetaMask";
import InvestorLayout from "../layouts/InvestorLayout";
import useStyles from "./style";
type Props = {};

export default function ConnectWalletPage({}: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { getSignature, connect, account, library } = useMetaMask();
  const userData = useSelector((s: any) => s.authAction.data);
  const [errorCheckAddress, setErrorCheckAddress] = useState("");
  const dispatch = useDispatch();

  const checkWatch = () => {
    if (!userData.metamaskAdress) return false;
    if (userData.metamaskAdress !== account) {
      return true;
    } else {
      return false;
    }
  };

  //   useEffect(() => {
  //     const item = localStorage.getItem("access_token");
  //     if (!item) {
  //       navigate("/sign-in");
  //       return;
  //     }
  //   }, [navigate]);

  const handleConnectWallet = async () => {
    if (!account) {
      connect();
    }
    if (!userData.metamaskAdress) {
      const signature = await getSignature("ConnectWallet");
      const res = await updateWalletAuth({
        signature: signature,
        wallet_address: account,
      });
      if (res?.error) {
        setErrorCheckAddress(res?.error.message);
      } else {
        dispatch(setUser({ ...userData, metamaskAdress: account }));
      }
    } else {
      if (account === userData.metamaskAdress) {
        navigate("/");
      } else {
        setErrorCheckAddress(
          "Wallet Address in Metamask did not match your address. Please switch wallet address!"
        );
      }
    }
  };

  return (
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
                disabled={checkWatch()}
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
  );
}