import { FormControl, MenuItem, Select } from "@material-ui/core";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useStyles from "./style";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  value: string;
  status: boolean;
  onClickSelect: (value: any) => void;
};

export default function ModalSaleStage(props: ModalProps) {
  const { open, onClose, value, status, onClickSelect } = props;

  const styles = useStyles();

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
    {
      id: 0,
      name: "",
    },
  ];

  return (
    <FormControl className={status ? styles.wrapper : styles.wrapperEdit}>
      <Select
        value={value}
        label="Age"
        onChange={(e) => onClickSelect(e.target.value)}
        disabled={!status}
        IconComponent={() => (!status ? null : <ArrowDropDownIcon />)}
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
