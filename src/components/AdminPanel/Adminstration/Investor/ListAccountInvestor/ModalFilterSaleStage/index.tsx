import { useState } from "react";
import useStyles from "./style";

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const data = [
  {
    id: 1,
    name: "Angel",
  },
  {
    id: 2,
    name: "Pre-seed",
  },
  {
    id: 3,
    name: "Private 1",
  },
  {
    id: 4,
    name: "Private 2",
  },
  {
    id: 5,
    name: "Public",
  },
  {
    id: 6,
    name: "Rewards",
  },
];

export default function ModalFilterSaleStage(props: ModalProps) {
  const { open, onClose } = props;
  const styles = useStyles();

  const [isFilter, setIsFilter] = useState<boolean>(false);

  const handleClickSaleStage = () => {
    // onClose();
    setIsFilter(true);
  };

  const handleClickCancel = () => {
    onClose();
  };
  const handleClickApply = () => {
    onClose();
  };

  return (
    <>
      {open && (
        <div className={styles.wrapper}>
          <div className="btn">
            <button onClick={handleClickCancel} className="btnCancel">
              Cancel
            </button>
            <button
              onClick={handleClickApply}
              className={`${isFilter ? "btnIsApply" : "btnApply"}`}
            >
              Apply
            </button>
          </div>
          {data.map((item) => (
            <div key={item.id} onClick={handleClickSaleStage} className="item">
              {isFilter && <img src="/images/iconApply.svg" alt="" />}
              {item.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
