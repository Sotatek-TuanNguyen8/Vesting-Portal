import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStyles from "./style";
import { Logo } from "../../assets/svgs";
type Props = {
  isTab?: boolean;
  children?: ReactNode;
};

export default function AuthLayout({ isTab = true, children }: Props) {
  const location = useLocation();
  const { pathname } = location;
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    if (item) {
      navigate("/connect-wallet");
      return;
    }
  }, [navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.boxContainer}>
        <div className={classes.logo}>
          <Logo />
          <Typography variant="body1">
            LIQUIDITY AGGREGATION, TRANSFORMED
          </Typography>
        </div>
        <div className={classes.content}>
          {isTab && (
            <div className="box">
              <div className="tab">
                <Link
                  to="/sign-up"
                  className={clsx(
                    "btnTab",
                    pathname === "/sign-up" && "activeTab"
                  )}
                >
                  SIGN UP
                </Link>

                <Link
                  to="/sign-in"
                  className={clsx(
                    "btnTab",
                    pathname === "/sign-in" && "activeTab"
                  )}
                >
                  SIGN IN
                </Link>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
