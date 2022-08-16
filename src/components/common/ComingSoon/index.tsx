import React from "react";
import { InvestorLayout } from "@/components";
import styles from "./styles.module.scss";
import { LogoLend } from "@/svgs";
type Props = {
  props: any;
  chilren: any;
};

export function ComingSoon(Props: any) {
  return (
    <InvestorLayout>
      <div className={styles.container}>
        <div className={styles.title}>
          <LogoLend />
          <p>{Props.title}</p>
        </div>
        <p className={styles.coming}>COMING SOON</p>
        <div className={styles.desc}>{Props.children}</div>
      </div>
    </InvestorLayout>
  );
}
