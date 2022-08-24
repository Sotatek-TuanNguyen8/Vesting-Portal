import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../common/Header";
import { useSelector } from "react-redux";
import useStyles from "./style";

type Props = {
  children?: ReactNode;
  isNav?: boolean;
};

export default function LayoutAdmin({ children, isNav = false }: Props) {
  const accessToken = useSelector((s: any) => s.adminAuthAction.token);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (accessToken) {
      return;
    } else {
      navigate("/admin-panel");
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
