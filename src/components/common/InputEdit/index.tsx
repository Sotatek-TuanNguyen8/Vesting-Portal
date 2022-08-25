import { useState } from "react";
import ModalSaleStage from "./ModalSaleStage";
import useStyles from "./style";

type InputProps = {
  value: any;
  status: boolean;
  field: string;
  type: string;
  onChange: (e: any, field: any) => void;
};
export default function InputTableEdit(props: InputProps) {
  const { value, status, onChange, field, type } = props;
  const styles = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  // const [, setOpen] = useState<boolean>(false);

  const handleClickDropdown = () => {
    setOpen((preState) => !preState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleUpdate = (id: number) => {

  // }

  return (
    <div className={styles.wrapper}>
      {field === "saleStage" ? (
        <div
          className={` ${!status ? styles.hiddenSaleStage : styles.saleStage} `}
        >
          {value}
          {status && (
            <>
              <img
                onClick={handleClickDropdown}
                src="/images/iconDropdown.svg"
                alt=""
              />
              <div className="modalSaleStage">
                <ModalSaleStage open={open} onClose={handleClose} />
              </div>
            </>
          )}
        </div>
      ) : field === "fullName" ? (
        <input
          type={type}
          className={` ${
            !status ? styles.hiddenInputFullname : styles.inputFullname
          } `}
          value={value}
          disabled={!status}
          onChange={(e) => onChange(e.target.value, field)}
        />
      ) : (
        <input
          type={type}
          className={` ${!status ? styles.hiddenInput : styles.input} `}
          value={value}
          disabled={!status}
          onChange={(e) => onChange(e.target.value, field)}
        />
      )}
    </div>
  );
}
