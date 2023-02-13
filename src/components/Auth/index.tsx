import clsx from "clsx";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./style";
type Props = {
  isTab?: boolean;
  children?: ReactNode;
};

export default function AuthLayout({ isTab = true, children }: Props) {
  const location = useLocation();
  const { pathname } = location;
  const classes = useStyles();

  return (
    <div className={classes.boxContainer}>
      <div className={classes.content}>
        {isTab && (
          <div className="box">
            <div className="tab">
              <Link
                to="/sign-in"
                className={clsx(
                  "btnTab",
                  pathname === "/sign-in" && "activeTab"
                )}
              >
                Log In
              </Link>
              <Link
                to="/sign-up"
                className={clsx(
                  "btnTab",
                  pathname === "/sign-up" && "activeTab"
                )}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
