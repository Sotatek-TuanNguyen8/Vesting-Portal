import { Dialog } from "@material-ui/core";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { deleteInvestor } from "../../../../../service/admin.service";
import Loading from "../../../../common/Loading";
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClickCancel = () => {
    onClose();
  };

  const handleClickDelete = useCallback(async () => {
    onClose();
    setIsLoading(true);
    await deleteInvestor(id);
    fetchListInvestors();
    toast.success("Delete Investor Success");
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
    </>
  );
}
