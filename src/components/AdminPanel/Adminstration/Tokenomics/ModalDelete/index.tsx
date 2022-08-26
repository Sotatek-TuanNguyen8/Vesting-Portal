import { Dialog } from "@material-ui/core";
import useStyles from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
  id: number;
};

export default function ModalDelete({ open, onClose, id }: Props) {
  const styles = useStyles();
  const handleClickCancel = () => {
    onClose();
  };

  const handleConfirm = () => {
    console.log(id);
  };

  return (
    <Dialog
      className={styles.container}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div className={styles.content}>
        <p>21 investors are in this round.</p>
        <p>Are you sure you want to delete this round?</p>
      </div>
      <div className={styles.textContent}>
        <button onClick={handleClickCancel} className={styles.btnCancel}>
          Cancel
        </button>
        <button onClick={handleConfirm} className={styles.btnCreate}>
          Delete
        </button>
      </div>
    </Dialog>
  );
}
