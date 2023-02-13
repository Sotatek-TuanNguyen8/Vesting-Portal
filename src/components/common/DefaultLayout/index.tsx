import React from "react";
import Footer from "../Footer";
import { Header } from "../Header";
import NavVertical from "../NavVertical";
import useStyles from "./style";
type Props = {
  children?: React.ReactElement;
  notShowInfo?: boolean;
};

export default function DefaultLayout({ children, notShowInfo }: Props) {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className={classes.main}>
        <NavVertical notShowInfo={notShowInfo} />
        {children}
      </div>
      <Footer />
    </div>
  );
}
