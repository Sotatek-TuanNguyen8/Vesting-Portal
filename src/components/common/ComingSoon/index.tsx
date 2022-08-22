import { LogoLend } from "../../../assets/svgs";
import InvestorLayout from "../../layouts/InvestorLayout";
import useStyles from "./style";
type Props = {
  props: any;
  chilren: any;
};

export function ComingSoon(Props: any) {
  const classes = useStyles();
  return (
    <InvestorLayout isNav={true}>
      <div className={classes.container}>
        <div className={classes.title}>
          <LogoLend />
          <p>{Props.title}</p>
        </div>
        <p className={classes.coming}>COMING SOON</p>
        <div className={classes.desc}>{Props.children}</div>
      </div>
    </InvestorLayout>
  );
}
