import useStyles from "./style";
import TooltipValidate from "./ValidateEditInput";

type InputProps = {
  value: any;
  status: boolean;
  field: string;
  defaultValue: string;
  onChange: (e: any, field: any) => void;
};
export default function InputTableEdit(props: InputProps) {
  const { value, status, onChange, field, defaultValue } = props;
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      {field === "allocation_token" ? (
        <input
          className={` ${
            !status || !defaultValue ? styles.hiddenInput : styles.input
          } `}
          value={value}
          type="number"
          min={0}
          disabled={!status || !defaultValue}
          onChange={(e) => onChange(Number(e.target.value), field)}
        />
      ) : field === "full_name" ? (
        <input
          className={` ${
            !status || !defaultValue
              ? styles.hiddenInputFullname
              : styles.inputFullname
          } `}
          value={value}
          disabled={!status || !defaultValue}
          onChange={(e) => onChange(e.target.value, field)}
        />
      ) : (
        <>
          <input
            className={` ${
              !status || !defaultValue ? styles.hiddenInput : styles.input
            } `}
            value={value}
            disabled={!status || !defaultValue}
            onChange={(e) => onChange(e.target.value, field)}
          />
        </>
      )}
      {status ? (
        <TooltipValidate
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
