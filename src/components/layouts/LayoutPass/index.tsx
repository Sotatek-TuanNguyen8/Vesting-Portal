import { ReactNode } from "react";
import useStyles from "./style";
import { LogoLend } from "../../../assets/svgs";

type Props = {
  children?: ReactNode;
};

export function LayoutPass({ children }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.logo}>
        <LogoLend />
      </div>
      {children}
    </div>
  );
}
