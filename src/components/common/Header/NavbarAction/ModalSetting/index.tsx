import React from "react";
import useStyles from "./style";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowDownIcon } from "../../../../../assets/svgs/arrow_down.svg";
import { ReactComponent as EarthIcon } from "../../../../../assets/svgs/earth.svg";
import { ReactComponent as DarkIcon } from "../../../../../assets/svgs/dark.svg";

export default function ModalSetting() {
  const classes = useStyles();
  return (
    <div className={classes.navbarAction}>
      <button className={classes.btnLogin}>
        <Link to="/sign-in">LOGIN</Link>
      </button>
      <button className={classes.btnRegister}>
        <Link to="/sign-up">REGISTER</Link>
      </button>
      <EarthIcon />
      <div className={classes.navLang}>
        <span>ENG</span>
        <ArrowDownIcon />
      </div>
      <DarkIcon />
    </div>
  );
}
