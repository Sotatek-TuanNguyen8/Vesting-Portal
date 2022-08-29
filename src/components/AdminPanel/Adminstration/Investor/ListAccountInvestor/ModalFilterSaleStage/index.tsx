import { Divider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { IconCloseBlue } from "../../../../../../assets/svgs";
import useStyles from "./style";
type Props = {
  open: boolean;
  onClose: () => void;
  onFilter: (data: string[]) => void;
  data: IData[];
};

export interface IData {
  id: number;
  name: string;
}

export default function FilterAdmin({ open, onClose, onFilter, data }: Props) {
  const classes = useStyles();
  const [dataList, setDataList] = useState<IData[]>([]);

  const handleClick = (value: IData) => {
    const index = dataList.findIndex((el) => el.id === value.id);
    if (index !== -1) {
      setDataList(dataList.filter((el) => el.id !== value.id));
    } else {
      setDataList([...dataList, value]);
    }
  };

  const handleClearFilter = () => {
    setDataList([]);
    onFilter([]);
  };

  const handleFilter = () => {
    onFilter(dataList.map((el) => el.id.toString()));
    onClose();
  };

  return (
    <>
      {open && (
        <div className={classes.select}>
          <div>
            <div className={classes.action}>
              <button className="btn btnCancel" onClick={onClose}>
                Cancel
              </button>
              <button
                onClick={handleFilter}
                className="btn btnApply"
                disabled={dataList?.length <= 0}
              >
                Apply
              </button>
            </div>
            <Divider />
            {dataList?.length > 0 && (
              <div>
                <div
                  className={classes.clearFilter}
                  onClick={handleClearFilter}
                >
                  <IconCloseBlue />
                  Clear filter
                </div>
                <Divider />
              </div>
            )}

            {data.map((el, index) => (
              <div
                key={index}
                onClick={() => handleClick({ id: el.id, name: el.name })}
                className={classes.item}
              >
                <Checkbox
                  checked={dataList.map((it) => it.id).indexOf(el.id) > -1}
                />
                <ListItemText primary={el.name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
