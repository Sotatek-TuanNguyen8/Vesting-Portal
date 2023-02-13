import React from "react";
import useStyles from "./style";
import { ReactComponent as SuccessIcon } from "../../../assets/svgs/gg_auth_success.svg";
import { Link } from "react-router-dom";

export default function Complete() {
  const classes = useStyles();
  return (
    <div className={classes.complete}>
      <SuccessIcon />
      <p className={classes.completeContent}>
        You have successfully enabled Google Authenticator.
      </p>
      <button className={classes.btnNext}>
        <Link to="/connect-wallet">Next</Link>
      </button>
    </div>
  );
}
