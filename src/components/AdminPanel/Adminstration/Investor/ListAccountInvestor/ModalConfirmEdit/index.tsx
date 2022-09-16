import { Dialog } from "@material-ui/core";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteInvestor,
  updateInvestorNew,
} from "../../../../../../service/admin.service";
import Loading from "../../../../../common/Loading";
import useStyles from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
  id: any;
  fetchListInvestors: () => void;
  dataItem: any;
  setIsEdit: any;
  setDuplicateWallet: any;
  setDuplicateEmail: any;
  setTokenAmountInvalid: any;
  setMsgTokenAmount: any;
  setShowMsgErrSaleStage: any;
};

export default function ModalConfirmEdit({
  open,
  onClose,
  id,
  fetchListInvestors,
  dataItem,
  setIsEdit,
  setDuplicateWallet,
  setDuplicateEmail,
  setTokenAmountInvalid,
  setMsgTokenAmount,
  setShowMsgErrSaleStage,
}: Props) {
  const styles = useStyles();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClickCancel = () => {
    onClose();
  };

  const handleClickConfirm = useCallback(async () => {
    onClose();
    setIsLoading(true);
    const dataUpdate = await updateInvestorNew(dataItem.investor_id, {
      wallet_address: dataItem?.wallet_address,
      allocation_token: Number(dataItem?.allocation_token),
      stage_id: dataItem?.stage_id,
      full_name: dataItem?.full_name,
      email: dataItem?.email,
    });

    if (dataUpdate?.status === 200) {
      setIsEdit(false);
      toast.success("Update Successfully");
    } else if (dataUpdate?.status === 405 || dataUpdate?.status === 410) {
      setDuplicateWallet(true);
    } else if (dataUpdate?.status === 406) {
      setDuplicateEmail(true);
    } else if (dataUpdate?.status === 400) {
      setTokenAmountInvalid(true);
      setMsgTokenAmount(dataUpdate?.data?.error.message);
    } else if (dataUpdate?.status === 409) {
      setShowMsgErrSaleStage(true);
    } else {
      setIsEdit(false);
    }
    fetchListInvestors();
    setIsLoading(false);
  }, [fetchListInvestors, id, onClose]);

  return (
    <>
      <Loading open={isLoading} />
      <Dialog
        className={styles.container}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <div className="content">
          <p>This investor is in mutiple rounds</p>
          <p>Are you sure you want to update this investor?</p>
        </div>
        <div className={styles.textContent}>
          <button onClick={handleClickCancel} className={styles.btnCancel}>
            Cancel
          </button>
          <button onClick={handleClickConfirm} className={styles.btnDelete}>
            Confirm
          </button>
        </div>
      </Dialog>
    </>
  );
}
