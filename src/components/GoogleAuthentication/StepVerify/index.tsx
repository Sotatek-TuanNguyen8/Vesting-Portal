import CheckIcon from "@mui/icons-material/Check";
import classNames from "classnames";
import { useState } from "react";
import { IStep, STEP } from "../../../classes/ggAuthenticator";
import BackupKey from "../BackupKey";
import DownloadApp from "../DownloadApp";
import ScanQR from "../ScanQR";
import useStyles from "./style";
import Complete from "../Complete";

export default function TimelineVerify() {
  const classes = useStyles();
  const [toggleStep, setToggleStep] = useState<STEP>(1);

  const handleToggleStep = (step: STEP) => {
    setToggleStep(step);
  };

  const renderStep = () => {
    switch (toggleStep) {
      case 2: {
        return <ScanQR handleToggleStep={handleToggleStep} />;
      }
      case 3: {
        return <BackupKey handleToggleStep={handleToggleStep} />;
      }
      case 4: {
        return <Complete />;
      }
      default: {
        return <DownloadApp handleToggleStep={handleToggleStep} />;
      }
    }
  };

  const arrayStep: IStep[] = [
    { label: "Download App", value: STEP.one },
    { label: "Scan QR Code", value: STEP.two },
    { label: "Save Backup Key", value: STEP.three },
    { label: "Complete", value: STEP.four },
  ];

  return (
    <div className={classes.box}>
      <span className={classes.header}>Enable Google Authentication</span>
      <div className={classes.verify}>
        <div className={classes.container}>
          <div className={classes.progressContainer}>
            <div className={classes.progress}></div>
            {arrayStep.map((step, index) => (
              <div
                className={classNames(
                  classes.circle,
                  toggleStep >= step.value && classes.active
                )}
                key={index}
              >
                <div className={classes.step}>
                  {toggleStep > step.value ? (
                    <CheckIcon fontSize="small" />
                  ) : (
                    step.value
                  )}
                </div>
                <div className={classes.caption}>{step.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.body}>{renderStep()}</div>
      </div>
    </div>
  );
}
