import { LogoLend } from "../../../assets/svgs";
import InvestorUserLayout from "../../layouts/InvestorUserLayout";
import useStyles from "./style";
type Props = {
  props: any;
  chilren: any;
};

export function ComingSoon(Props: any) {
  const classes = useStyles();
  return (
    <InvestorUserLayout isNav={true}>
      <div className={classes.container}>
        <div className={classes.title}>
          <LogoLend />
          <p>{Props.title}</p>
        </div>
        <p className={classes.coming}>COMING SOON</p>
        <div className={classes.desc}>{Props.children}</div>
      </div>
    </InvestorUserLayout>
  );
}
