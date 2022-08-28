import { Dialog } from "@material-ui/core";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { deleteInvestor } from "../../../../../service/admin.service";
import useStyles from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
  id: any;
  fetchListInvestors: () => void;
};

export default function ModalDelete({
  open,
  onClose,
  id,
  fetchListInvestors,
}: Props) {
  const styles = useStyles();
  const handleClickCancel = () => {
    onClose();
  };

  const handleClickDelete = useCallback(async () => {
    await deleteInvestor(id);
    fetchListInvestors();
    onClose();
    toast.success("Delete Investor Success");
  }, [fetchListInvestors, id, onClose]);

  return (
    <Dialog
      className={styles.container}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <p>Are you sure you want to delete this investor?</p>
      <div className={styles.textContent}>
        <button onClick={handleClickCancel} className={styles.btnCancel}>
          Cancel
        </button>
        <button onClick={handleClickDelete} className={styles.btnDelete}>
          Delete
        </button>
      </div>
    </Dialog>
  );
}
