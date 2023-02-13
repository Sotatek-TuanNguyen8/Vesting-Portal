import { Box, Modal, Typography } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import { STEP } from "../../../classes/ggAuthenticator";
import { useAppSelector } from "../../../store/reducers";
import ModalVerify, { VerifyForm } from "../ModalVerify";
import useStyles, { styleModal } from "./style";
import { verify2FA } from "../../../service/ggAuth.service";
import { toast } from "react-toastify";

type Props = {
  handleToggleStep: (step: STEP) => void;
};

export default function BackupKey({ handleToggleStep }: Props) {
  const classes = useStyles();
  const ggAuthState = useAppSelector((state) => state.ggAuthReducer);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleToggleModal = (payload: boolean) => {
    setOpenModal(payload);
  };

  const onToggleStep = (step: STEP) => {
    handleToggleStep(step);
  };

  const handleVerify = async (payload: VerifyForm) => {
    const [res] = await verify2FA({
      secret: ggAuthState.data.secret,
      token: payload.googleCode,
    });
    if (res) {
      localStorage.setItem("access_token", res.data?.accessToken);
      handleToggleStep(STEP.four);
    } else {
      toast.error("Verification code is not correct.");
    }
  };

  return (
    <>
      <div className={classes.container}>
        <Typography
          variant="body1"
          className={clsx(classes.font16, classes.textCenter)}
        >
          Please save this key as a backup
        </Typography>
        <div className={classes.backup}>{ggAuthState.data.secret}</div>
        <Typography variant="body2" className={classes.textCenter}>
          This key will allow you to recover your Google Authenticator as a
          backup method.
        </Typography>
        <div className={classes.action}>
          <button
            className={classes.btnBack}
            onClick={() => onToggleStep(STEP.two)}
          >
            Back
          </button>
          <button
            className={classes.btnNext}
            onClick={() => handleToggleModal(true)}
          >
            Enable Verification
          </button>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => handleToggleModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <ModalVerify handleVerify={handleVerify} />
        </Box>
      </Modal>
    </>
  );
}
