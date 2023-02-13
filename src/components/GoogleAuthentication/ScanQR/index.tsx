import { Typography } from "@mui/material";
import QRCode from "qrcode.react";
import { STEP } from "../../../classes/ggAuthenticator";
import { useAppSelector } from "../../../store/reducers";
import useStyles from "./style";

type Props = {
  handleToggleStep: (step: STEP) => void;
};

export default function ScanQR({ handleToggleStep }: Props) {
  const classes = useStyles();
  const ggAuthState = useAppSelector((state) => state.ggAuthReducer);

  const onToggleStep = (step: STEP) => {
    handleToggleStep(step);
  };

  return (
    <>
      <div className={classes.container}>
        <Typography variant="body1" className={classes.font16}>
          Scan this QR using Google Authenticator
        </Typography>
        <div className={classes.boxLink}>
          <QRCode renderAs="svg" value={ggAuthState.data.otp_auth} size={136} />
        </div>
      </div>
      <div className={classes.action}>
        <button
          className={classes.btnBack}
          onClick={() => onToggleStep(STEP.one)}
        >
          Back
        </button>
        <button
          className={classes.btnNext}
          onClick={() => onToggleStep(STEP.three)}
        >
          Next
        </button>
      </div>
    </>
  );
}
