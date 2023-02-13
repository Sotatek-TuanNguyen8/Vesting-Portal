import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WrongNetwork } from "../../WrongNetWork/index";
import useStyles from "./style";
import useMetaMask from "../../../utils/hooks/useMetaMask";

type Props = {
  children?: ReactNode;
  isNav?: boolean;
};

export default function AdminLayout({ children, isNav = false }: Props) {
  const navigate = useNavigate();
  const { wrongNetWork } = useMetaMask();
  const styles = useStyles();

  useEffect(() => {
    const item = sessionStorage.getItem("access_token");
    if (!item || item === "undefined") {
      navigate("/admin-panel");
      return;
    }
  }, [navigate]);

  return (
    <div className={styles.adminLayout}>
      <div className={styles.wrongNetWorkContainer}>
        {wrongNetWork && <WrongNetwork />}
      </div>
      {children}
    </div>
  );
}
