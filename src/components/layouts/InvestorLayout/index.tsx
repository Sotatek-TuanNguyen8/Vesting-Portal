import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header";
import useStyles from "./style";

type Props = {
  children?: ReactNode;
  isNav?: boolean;
};

export default function InvestorLayout({ children, isNav = false }: Props) {
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    if (item) {
      return;
    } else {
      navigate("/sign-in");
    }
  }, [navigate]);

  return (
    <div className={classes.main}>
      <div className={classes.box}>
        <Header isNav={isNav} />
        {children}
      </div>
    </div>
  );
}
