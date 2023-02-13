import React from "react";
import { useNavigate } from "react-router-dom";

import useStyles from "./style";

type Props = {
  active: string;
};

export default function Administration({ active }: Props) {
  const styles = useStyles();
  const navigate = useNavigate();

  const handleClickInvestor = () => {
    navigate("/admin-panel/investor");
  };
  const handleClickTokenomics = () => {
    navigate("/admin-panel/tokenomics");
  };
  return (
    <div className={styles.body}>
      {active === "investor" ? (
        <>
          <div onClick={handleClickInvestor} className="investorActive">
            <span></span>
            <img src="/images/investor.svg" alt="" />
            <p>Investors</p>
          </div>
          <div onClick={handleClickTokenomics} className="tokenomics">
            <img src="/images/tokenomics.svg" alt="" />
            <p>Tokenomics</p>
          </div>
        </>
      ) : (
        <>
          <div onClick={handleClickInvestor} className="investor">
            <img src="/images/investor.svg" alt="" />
            <p>Investors</p>
          </div>
          <div onClick={handleClickTokenomics} className="tokenomicsActive">
            <span></span>
            <img src="/images/tokenomics.svg" alt="" />
            <p>Tokenomics</p>
          </div>
        </>
      )}
    </div>
  );
}
