import { Dialog } from "@material-ui/core";
import useStyles from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ModalDelete({ open, onClose }: Props) {
  const styles = useStyles();
  const handleClickCancel = () => {
    onClose();
  };

  const handleClickDelete = () => {};

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
        <button onClick={handleClickDelete} className={styles.btnCreate}>
          Delete
        </button>
      </div>
    </Dialog>
  );
}
