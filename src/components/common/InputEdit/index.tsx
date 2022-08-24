import useStyles from "./style";
import TooltipValidate from "./ValidateEditInput";

type InputProps = {
  value: any;
  status: boolean;
  field: string;
  onChange: (e: any, field: any) => void;
};
export default function InputTableEdit(props: InputProps) {
  const { value, status, onChange, field } = props;
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      {field === "fullName" ? (
        <input
          className={` ${
            !status ? styles.hiddenInputFullname : styles.inputFullname
          } `}
          value={value}
          disabled={!status}
          onChange={(e) => onChange(e.target.value, field)}
        />
      ) : (
        <>
          <input
            className={` ${!status ? styles.hiddenInput : styles.input} `}
            value={value}
            disabled={!status}
            onChange={(e) => onChange(e.target.value, field)}
          />
        </>
      )}
      <TooltipValidate value={value} field={field} />
    </div>
  );
}
