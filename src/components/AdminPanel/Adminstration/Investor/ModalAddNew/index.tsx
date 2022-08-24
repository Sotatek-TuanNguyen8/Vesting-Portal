import { Dialog, Typography } from "@material-ui/core";
import { ethers } from "ethers";
import { useRef, useState } from "react";
import useStyles from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ModalAddNew({ open, onClose }: Props) {
  const styles = useStyles();

  const [value, setValue] = useState<any>("");
  const [msgErrRequied, setMsgErrRequied] = useState<boolean>(false);
  const [msgErrInvalid, setMsgErrInvalid] = useState<boolean>(false);

  const ref = useRef<any>();
  const handleClickCancel = () => {
    onClose();
    setHiddenError();
  };

  const setHiddenError = () => {
    setMsgErrRequied(false);
    setMsgErrInvalid(false);
  };

  const handleChange = async (e: any) => {
    setValue(e.target.value);
    await setHiddenError();
    ref.current.focus();
  };

  const handleClickCreate = () => {
    if (!value) {
      setMsgErrRequied(true);
    } else if (!ethers.utils.isAddress(value)) {
      setMsgErrInvalid(true);
    } else {
      onClose();
    }
  };

  return (
    <Dialog
      className={styles.container}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Typography className={styles.title}>Create investor</Typography>

      <div className={styles.textContent}>
        <p>Wallet address</p>

        <>
          <div
            className={`inputText ${
              msgErrRequied || msgErrInvalid ? "error" : ""
            }`}
          >
            <input
              ref={ref}
              onChange={handleChange}
              value={value}
              type="text"
            />
          </div>
          {msgErrRequied && (
            <p className={styles.msgErr}>This field is required</p>
          )}
          {msgErrInvalid && (
            <p className={styles.msgErr}>Enter a valid wallet address</p>
          )}
        </>

        <div>
          <button onClick={handleClickCancel} className={styles.btnCancel}>
            Cancel
          </button>
          <button onClick={handleClickCreate} className={styles.btnCreate}>
            Create
          </button>
        </div>
      </div>
      <div></div>
    </Dialog>
  );
}
