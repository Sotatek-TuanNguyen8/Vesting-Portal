import React, { ReactNode } from "react";
import Header from "../Header";
import styles from "./styles.module.scss";

type Props = {
  children?: ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <Header />
        {children}
      </div>
    </div>
  );
}
