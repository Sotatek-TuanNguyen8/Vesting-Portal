import { FormControl, MenuItem, Select } from "@material-ui/core";
import { IData } from "../../../AdminPanel/Administration/Investor/ListAccountInvestor/ModalFilterSaleStage";
import TooltipValidate from "../ValidateEditInput";
import useStyles from "./style";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  value: string;
  status: boolean;
  onClickSelect: (value: any) => void;
  data: IData[];
  isFixed: boolean;
  hasProof: boolean;
  field: string;
  showMsgErrSaleStage: boolean;
};

export default function ModalSaleStage(props: ModalProps) {
  const {
    value,
    status,
    onClickSelect,
    data,
    isFixed,
    hasProof,
    field,
    showMsgErrSaleStage,
  } = props;
  const styles = useStyles();

  return (
    <>
      <FormControl className={styles.container}>
        <div
          className={
            (status && !hasProof) || (status && isFixed)
              ? showMsgErrSaleStage
                ? styles.wrapperError
                : styles.wrapper
              : styles.wrapperEdit
          }
        >
          {!status || (!isFixed && hasProof) ? (
            <span style={{ color: "#0A208F", fontSize: 16 }}>
              {data?.filter((el) => el.id === Number(value))[0]?.name}
            </span>
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
        </div>
        {status ? (
          <TooltipValidate
            value={value}
            field={field}
            showMsgErrSaleStage={showMsgErrSaleStage}
          />
        ) : (
          ""
        )}
      </FormControl>
    </>
  );
}
