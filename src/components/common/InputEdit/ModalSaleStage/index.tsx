import { FormControl, MenuItem, Select } from "@material-ui/core";
import { IData } from "../../../AdminPanel/Adminstration/Investor/ListAccountInvestor/ModalFilterSaleStage";
import useStyles from "./style";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  value: string;
  status: boolean;
  onClickSelect: (value: any) => void;
  data: IData[];
};

export default function ModalSaleStage(props: ModalProps) {
  const { value, status, onClickSelect, data } = props;
  const styles = useStyles();

  return (
    <FormControl className={status ? styles.wrapper : styles.wrapperEdit}>
      <Select
        value={value}
        label="Age"
        onChange={(e) => onClickSelect(e.target.value)}
        disabled={!status}
        // IconComponent={() => (!status ? null : <ArrowDropDownIcon />)}
      >
        {data.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
