import { FormControl, MenuItem, Select } from "@material-ui/core";
import { IData } from "../../../AdminPanel/Adminstration/Investor/ListAccountInvestor/ModalFilterSaleStage";
import TooltipValidateDefault from "../ValidateEditInputDefault";
import useStyles from "./style";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  value: string;
  status: boolean;
  onClickSelect: (value: any) => void;
  data: IData[];
  defaultValue?: string;
  field?: string;
  type?: string;
};

export default function ModalSaleStageDefault(props: ModalProps) {
  const { value, status, onClickSelect, data, defaultValue, field, type } =
    props;
  const styles = useStyles();

  return (
    <div className={styles.wrap}>
      <FormControl className={status ? styles.wrapper : styles.wrapperEdit}>
        {!status ? (
          <p style={{ color: "#0A208F", fontSize: 16 }}>
            {data?.filter((el) => el.id === Number(value))[0]?.name}
          </p>
        ) : (
          <Select
            value={Number(value)}
            label="Age"
            onChange={(e) => onClickSelect(e.target.value)}
            disabled={!status}
          >
            {data.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
      {status ? (
        <TooltipValidateDefault
          value={value}
          field={field}
          defaultValue={defaultValue}
          type={type}
        />
      ) : (
        ""
      )}
    </div>
  );
}
