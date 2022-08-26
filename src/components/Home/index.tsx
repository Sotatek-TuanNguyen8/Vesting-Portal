import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { fetchInfoUser, signUpResendSuccess } from "../../store/action";
import useMetaMask from "../../utils/hooks/useMetaMask";
import ClaimPage from "../claiming";
import InvestorUserLayout from "../layouts/InvestorUserLayout";
type Props = {};

export default function HomePage({}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((s: any) => s.authAction.data);
  const [checkFetchData, setCheckFetchData] = useState<boolean>(false);
  const { account } = useMetaMask();

  useEffect(() => {
    (async () => {
      const item = localStorage.getItem("access_token");
      if (!item) {
        navigate("/sign-in");
      } else {
        setCheckFetchData(false);
        await dispatch(fetchInfoUser(item));
        setCheckFetchData(true);
      }
    })();
  }, [dispatch, navigate, localStorage.getItem("access_token")]);

  useEffect(() => {
    if (!checkFetchData || !account) return;
    if (account?.toLowerCase() !== userData?.metamaskAddress?.toLowerCase()) {
      navigate("/connect-wallet");
      return;
    }
    if (!userData.isVerify) {
      dispatch(
        signUpResendSuccess({
          email: userData?.email,
          type: "sign-in",
        })
      );
      navigate("/resend-email");
      return;
    }
  }, [account, checkFetchData, dispatch, navigate, userData]);

  useEffect(() => {}, []);
  return (
    <InvestorUserLayout isNav={true}>
      <ClaimPage />
    </InvestorUserLayout>
  );
}
