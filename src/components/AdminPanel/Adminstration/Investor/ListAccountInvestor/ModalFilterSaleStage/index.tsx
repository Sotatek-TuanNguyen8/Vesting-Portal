import { Divider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { IconCloseBlue } from "../../../../../../assets/svgs";
import { getListStage } from "../../../../../../service/list-stage.service";
import useStyles from "./style";
type Props = {
  open: boolean;
  onClose: () => void;
};

interface IData {
  id: number;
  name: string;
}

export default function FilterAdmin({ open, onClose }: Props) {
  const classes = useStyles();
  const [data, setData] = useState<IData[]>([]);
  const [dataList, setDataList] = useState<IData[]>([]);

  const getList = async () => {
    const res = await getListStage();
    if (res?.data) {
      setData(res?.data);
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
  };

  console.log(dataList.map((el) => el.id.toString()));

  return (
    <>
      {open && (
        <div className={classes.select}>
          <div>
            <div className={classes.action}>
              <button className="btn btnCancel" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btnApply" disabled={dataList?.length <= 0}>
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
