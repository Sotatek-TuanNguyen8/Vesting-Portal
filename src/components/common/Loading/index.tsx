import { Dialog, DialogContent } from "@material-ui/core";

import useStyles from "./style";
import style from "./style.module.css";

const Loading = (props: { open: boolean }) => {
  const styles = useStyles();
  const { open } = props;

  return (
    <>
      <Dialog
        open={open}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={styles.modalLoading}
      >
        <div className="modal-content">
          <DialogContent className="modal-content__body">
            <div className={style.loader}></div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default Loading;
