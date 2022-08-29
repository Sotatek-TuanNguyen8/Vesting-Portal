import useStyles from "./style";
import TooltipValidateDefault from "./ValidateEditInputDefault";

type InputProps = {
  value: any;
  status: boolean;
  field: string;
  type: string;
  onChange: (e: any, field: any) => void;
  defaultValue: string;
  width: number | string;
};
export default function InputTableEditDefault(props: InputProps) {
  const { value, status, onChange, field, type, defaultValue, width } = props;
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <input
        type={type}
        className={` ${!status ? styles.hiddenInput : styles.input} `}
        value={value}
        disabled={!status}
        style={{ width: width ? width : "200px" }}
        onChange={(e) => onChange(e.target.value, field)}
      />
      {status ? (
        <TooltipValidateDefault
          value={value}
          field={field}
          defaultValue={defaultValue}
        />
      ) : (
        ""
      )}
    </div>
  );
}
