import { Dialog, Typography } from "@material-ui/core";
import { ethers } from "ethers";
import { useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { createInvestorNew } from "../../../../../service/admin.service";
import useStyles from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
  fetchListInvestors: () => void;
  setOpen: (value: boolean) => void;
};

export default function ModalAddNew({
  open,
  onClose,
  fetchListInvestors,
  setOpen,
}: Props) {
  const styles = useStyles();

  const [value, setValue] = useState<any>("");
  const [msgErrRequied, setMsgErrRequied] = useState<boolean>(false);
  const [msgErrInvalid, setMsgErrInvalid] = useState<boolean>(false);
  const [msgErrDuplicate, setMsgErrDuplicate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ref = useRef<any>();
  const handleClickCancel = () => {
    onClose();
    setHiddenError();
    setValue("");
  };

  const setHiddenError = () => {
    setMsgErrRequied(false);
    setMsgErrInvalid(false);
    setMsgErrDuplicate(false);
  };

  const handleChange = async (e: any) => {
    setValue(e.target.value);
    await setHiddenError();
    ref.current.focus();
  };

  const checkWalletInvestor = useCallback(async () => {
    setIsLoading(true);
    const data = await createInvestorNew({ wallet_address: value });
    if (data?.status === 201) {
      fetchListInvestors();
      onClose();
      toast.success("Add New Investor Success");
      setValue("");
    } else if (data?.status === 406) {
      setMsgErrDuplicate(true);
    }
    setIsLoading(false);
  }, [fetchListInvestors, onClose, value]);

  const handleClickCreate = useCallback(async () => {
    if (!value) {
      setMsgErrRequied(true);
      setMsgErrInvalid(false);
      setMsgErrDuplicate(false);
    } else if (!ethers.utils.isAddress(value)) {
      setMsgErrInvalid(true);
    } else {
      checkWalletInvestor();
    }
  }, [checkWalletInvestor, value]);

  return (
    <>
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
            {msgErrRequied || msgErrInvalid || msgErrDuplicate || isLoading ? (
              <button className={styles.btnCreateDisable}>Create</button>
            ) : (
              <button onClick={handleClickCreate} className={styles.btnCreate}>
                Create
              </button>
            )}
          </div>
        </div>
        <div></div>
      </Dialog>
    </>
  );
}
