import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMetaMask from "../../../utils/hooks/useMetaMask";
import { Header } from "../../common/Header";
import useStyles from "./style";

type Props = {
  children?: ReactNode;
  isNav?: boolean;
};

export default function InvestorUserLayout({ children, isNav = false }: Props) {
  const navigate = useNavigate();
  const classes = useStyles();
  const { account } = useMetaMask();

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    if (!item) {
      navigate("/sign-in");
      return;
    }
  }, [account, navigate]);

  return (
    <div className={classes.main}>
      <div className={classes.box}>
        <Header isNav={isNav} />
        {children}
      </div>
    </div>
  );
}
