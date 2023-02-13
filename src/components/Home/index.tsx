import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchInfoUser, signUpResendSuccess } from "../../store/action";
import { useAppDispatch, useAppSelector } from "../../store/reducers";
import useMetaMask from "../../utils/hooks/useMetaMask";
import ClaimPage from "../claiming";
import InvestorUserLayout from "../layouts/InvestorUserLayout";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((s) => s.authReducer.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
