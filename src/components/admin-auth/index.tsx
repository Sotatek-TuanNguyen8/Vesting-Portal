import { Box, ButtonBase, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error } from "../../assets/svgs";
import { loginAdmin } from "../../service";
import { scrollIntoView } from "../../utils/common/fn";
import { CONNECT_WALLET_ADMIN } from "../../utils/common/message-sign";
import useMetaMask from "../../utils/hooks/useMetaMask";
import useStyles from "./style";
import { Logo } from "../../assets/svgs/";
import Icon from "../../assets/svgs/iconErrorAdminAuth.svg";
export default function AdminAuthPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { getSignature, connect, account } = useMetaMask();
  const [errorCheckAddress, setErrorCheckAddress] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);
  const elRef = useRef(null);

  useEffect(() => {
    const item = sessionStorage.getItem("access_token");
    if (item) {
      navigate("/admin-panel/investor");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const windowObj: any = window;

    windowObj?.ethereum?.on("accountsChanged", (accounts: string[]) => {
      setErrorLogin(false);
    });
  }, [navigate]);

  const handleConnectWallet = async () => {
    setErrorLogin(false);
    setErrorCheckAddress("");
    if (!account) {
      await connect();
    }
    const signature = await getSignature(CONNECT_WALLET_ADMIN);

    if (signature) {
      const res = await loginAdmin(
        {
          signature: signature,
          wallet_address: account,
        },
        CONNECT_WALLET_ADMIN
      )
        .then((res) => {
          if (res === undefined) {
            setErrorLogin(true);
            navigate("/admin-panel");
          } else {
            setErrorLogin(false);
            localStorage.clear();
            sessionStorage.setItem("access_token", res?.data?.accessToken);
            navigate("/admin-panel/investor");
          }
        })
        .catch(() => {
          setErrorLogin(true);
          navigate("/admin-panel");
        });
    }
  };

  useEffect(() => {
    scrollIntoView(elRef);
  }, []);

  return (
    <div ref={elRef}>
      <div className={classes.main}>
        <Logo className={classes.logo} />
        <div className={classes.box}>
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
              <p className={classes.title}>ADMIN LOGIN</p>
              {errorCheckAddress && (
                <Typography
                  // variant="subtitle1"
                  color="#F44336"
                  fontSize={"14px!important"}
                  pb={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Error
                    width={16}
                    height={16}
                    style={{ marginRight: "5px" }}
                  />{" "}
                  {errorCheckAddress}
                </Typography>
              )}
              <Box
                sx={{
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <div className={errorLogin ? classes.active : classes.unActive}>
                  <img src={Icon} alt="" />
                  <p className={classes.titleError}>
                    Your wallet is not granted Admin role
                  </p>
                </div>

                {[
                  ["metamask", "Metamask"],
                  //   ["coinbase", "Coinbase Wallet"],
                ].map(([type, label]) => (
                  <div key={type} className={classes.container}>
                    <ButtonBase
                      className={classes.Wallet}
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
                  </div>
                ))}
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
}
