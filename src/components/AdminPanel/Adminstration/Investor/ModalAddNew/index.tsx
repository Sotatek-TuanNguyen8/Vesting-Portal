import { Dialog, Typography } from "@material-ui/core";
import { ethers } from "ethers";
import { useRef, useState } from "react";
import {
  createInvestorNew,
  getListInvestor,
} from "../../../../../service/admin.service";
import { IListInvestor } from "../../../../../utils";
import useStyles from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
  body: IListInvestor;
};

export default function ModalAddNew({ open, onClose, body }: Props) {
  const styles = useStyles();

  const [value, setValue] = useState<any>("");
  const [msgErrRequied, setMsgErrRequied] = useState<boolean>(false);
  const [msgErrInvalid, setMsgErrInvalid] = useState<boolean>(false);
  const [msgErrDuplicate, setMsgErrDuplicate] = useState<boolean>(false);

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

  const checkWalletInvestor = async () => {
    const data = await createInvestorNew({ wallet_address: value });
    if (data?.status === 201) {
      onClose();
      await getListInvestor(
        body,
        localStorage.getItem("access_token") as string
      );
    } else if (data?.status === 406) {
      setMsgErrDuplicate(true);
    }
  };

  const handleClickCreate = async () => {
    if (!value) {
      setMsgErrRequied(true);
    } else if (!ethers.utils.isAddress(value)) {
      setMsgErrInvalid(true);
    } else {
      checkWalletInvestor();
      // onClose();
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
              msgErrRequied || msgErrInvalid || msgErrDuplicate ? "error" : ""
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
          {msgErrDuplicate && (
            <p className={styles.msgErr}>
              This wallet address has been used by another investor
            </p>
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
