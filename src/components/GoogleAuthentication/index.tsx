import { Box } from "@material-ui/core";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verify2FA } from "../../service/ggAuth.service";
import { fetchGenerateSecret } from "../../store/action/ggAuth.action";
import { useAppDispatch, useAppSelector } from "../../store/reducers";
import DefaultLayout from "../common/DefaultLayout";
import { styleModal } from "./BackupKey/style";
import ModalVerify, { VerifyForm } from "./ModalVerify";
import TimelineVerify from "./StepVerify";

export default function GoogleAuthentication() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ggAuthState = useAppSelector((state) => state.ggAuthReducer);
  const userState = useAppSelector((state) => state.authReducer);

  const generateSecret = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/sign-in");
      return;
    }
    if (userState.data.isEnable2FA || localStorage.getItem("is_enable_2FA"))
      return;
    if (accessToken) {
      await dispatch(fetchGenerateSecret(accessToken));
    }
  }, [dispatch, navigate, userState.data.isEnable2FA]);

  useEffect(() => {
    generateSecret();
  }, [generateSecret]);

  const handleVerify = async (payload: VerifyForm) => {
    const [res] = await verify2FA({
      secret: ggAuthState.data.secret,
      token: payload.googleCode,
    });
    if (res) {
      localStorage.setItem("access_token", res.data?.accessToken);
      navigate("/connect-wallet");
    } else {
      toast.error("Verification code is not correct.");
    }
  };

  return (
    <DefaultLayout notShowInfo={true}>
      {userState.data.isEnable2FA || localStorage.getItem("is_enable_2FA") ? (
        <Box sx={styleModal}>
          <ModalVerify handleVerify={handleVerify} />
        </Box>
      ) : (
        <TimelineVerify />
      )}
    </DefaultLayout>
  );
}
