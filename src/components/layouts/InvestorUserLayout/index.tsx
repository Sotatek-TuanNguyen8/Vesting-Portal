import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMetaMask from "../../../utils/hooks/useMetaMask";
import DefaultLayout from "../../common/DefaultLayout";
import useStyles from "./style";

type Props = {
  children?: ReactNode;
  isNav?: boolean;
  notShowInfo?: boolean;
};

export default function InvestorUserLayout({
  children,
  isNav = false,
  notShowInfo,
}: Props) {
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
    <DefaultLayout notShowInfo={notShowInfo}>
      <div className={classes.main}>{children}</div>
    </DefaultLayout>
  );
}
