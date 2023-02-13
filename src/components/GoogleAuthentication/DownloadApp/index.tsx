import { Button, Typography } from "@mui/material";
import clsx from "clsx";
import { ReactComponent as AppleIcon } from "../../../assets/svgs/apple-store.svg";
import { ReactComponent as GooglePlayIcon } from "../../../assets/svgs/google-play.svg";
import useStyles from "./style";
import { STEP } from "../../../classes/ggAuthenticator";

type Props = {
  handleToggleStep: (step: STEP) => void;
};

export default function DownloadApp({ handleToggleStep }: Props) {
  const classes = useStyles();
  const onToggleStep = () => {
    handleToggleStep(STEP.two);
  };
  return (
    <div className={classes.container}>
      <Typography variant="body1" className={clsx(classes.textCenter)}>
        Download and install Google Authenticator app
      </Typography>
      <div className={classes.boxLink}>
        <Button
          variant="outlined"
          className={classes.buttonLink}
          target="_blank"
          href="https://apps.apple.com/us/app/google-authenticator/id388497605"
        >
          <div className={classes.boxInfo}>
            <AppleIcon />
            <Typography
              className={clsx(classes.margin4, classes.textInitial)}
              variant="caption"
            >
              Download from
            </Typography>
            <Typography className={classes.textInitial} variant="body2">
              App Store
            </Typography>
          </div>
        </Button>
        <Button
          variant="outlined"
          className={classes.buttonLink}
          target="_blank"
          href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US"
        >
          <div className={classes.boxInfo}>
            <GooglePlayIcon />
            <Typography
              className={clsx(classes.margin4, classes.textInitial)}
              variant="caption"
            >
              Download from
            </Typography>
            <Typography variant="body2" className={classes.textInitial}>
              Google Play
            </Typography>
          </div>
        </Button>
      </div>
      <button onClick={onToggleStep} className={classes.btnNext}>
        Next
      </button>
    </div>
  );
}
