import React from "react";
import { InvestorLayout } from "@/components";
import styles from "./styles.module.scss";
import { LogoLend } from "@/svgs";
type Props = {};

export default function LendPage({}: Props) {
  return (
    <InvestorLayout>
      <div className={styles.container}>
        <div className={styles.title}>
          <LogoLend />
          <p>LEND</p>
        </div>
        <p className={styles.coming}>COMING SOON</p>
        <div className={styles.desc}>
          <p>
            FLUID users will be able to borrow stablecoin by using $FLD as
            collateral, or lend $FLD for margin to earn APY. The solution is
            peer-to-peer based and made possible through the FLUID ecosystem.
            There are 2 main solutions users can leverage:
          </p>
          <p>
            <span>FLUID Stable Lend</span> will provide users with a stable coin
            loan of up to 25% of the collateralized value at the time that the
            FLD is deposited. The fees are dependent on the loan term that can
            be up to 1 year.
          </p>
          <p>
            <span>FLUID Margin</span> will allow our users to use leverage on
            <span> FLUID Trades</span>
          </p>
        </div>
      </div>
    </InvestorLayout>
  );
}
