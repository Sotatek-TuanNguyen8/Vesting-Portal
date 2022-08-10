import { Typography } from "@material-ui/core";
import React, { useState } from "react";

type Props = {};

export default function Auth({}: Props) {
  const [tab, setTab] = useState("signUp");
  return (
    <div>
      <div>
        <div className="logo">
          <Typography variant="body1">
            LIQUIDITY AGGREGATION, TRANSFORMED
          </Typography>
        </div>
        <div className="tab">
          <div className="signUp">SIGN UP</div>
          <div className="login">LOGIN</div>
        </div>
      </div>
    </div>
  );
}
