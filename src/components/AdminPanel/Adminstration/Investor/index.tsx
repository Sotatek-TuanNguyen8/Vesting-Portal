import { useState } from "react";
import Administration from "..";
import AdminPanel from "../..";
import ListAccountInvestor from "./ListAccountInvestor";
import ModalAddNew from "./ModalAddNew";
import useStyles from "./style";

type Props = {};

export default function Investors({}: Props) {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const renderOpenModalAddNew = () => (
    <ModalAddNew open={open} onClose={handleClose} />
  );
  const handleAddNew = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <AdminPanel />
      <div className={styles.container}>
        <Administration active={"investor"} />
        <div className="listInvestor">
          <div className="new">
            <img onClick={handleAddNew} src="/images/iconAdd.svg" alt="" />
            <p>New</p>
          </div>
          <div className={styles.body}>
            <div className="search">
              <img src="/images/iconSearch.svg" alt="" />
              <input type="text" />
            </div>
            <ListAccountInvestor />
          </div>
          {renderOpenModalAddNew()}
        </div>
      </div>
    </div>
  );
}
