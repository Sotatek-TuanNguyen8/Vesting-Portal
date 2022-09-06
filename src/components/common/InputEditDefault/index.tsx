import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./style";
import TooltipValidateDefault from "./ValidateEditInputDefault";

type InputProps = {
  value: any;
  status: boolean;
  field: string;
  type: string;
  onChange: (e: any, field: any) => void;
  defaultValue?: string;
  width?: number | string;
  step?: number | string | undefined;
  min?: number | string;
  title?: string;
  active: boolean;
};
export default function InputTableEditDefault(props: InputProps) {
  const { value, status, onChange, field, type, defaultValue, width, active } =
    props;
  const [activeError, setActiveError] = useState(false);

  const styles = useStyles();
  const shortNumber = (string?: string) => {
    if (string && string.length > 10) {
      return (string.slice(0, 3) + "..." + string.slice(-4)).toLowerCase();
    } else {
      return string;
    }
  };

  useEffect(() => {
    if (!status) {
      setActiveError(false);
    }
  }, [status]);

  return (
    <div className={styles.wrapper}>
      {status ? (
        <input
          {...props}
          title={value}
          type={type}
          className={` ${!status ? styles.hiddenInput : styles.input} `}
          value={value}
          disabled={!status}
          min="0"
          style={{
            width: width ? width : "200px",
            border: `1px solid  ${activeError && "#F44336"}`,
          }}
          onChange={(e) => onChange(e.target.value, field)}
        />
      ) : (
        <p>
          {type === "number" && field !== "tge_amount"
            ? shortNumber(value)
            : value}{" "}
          {field === "tge_amount" && "%"}
        </p>
      )}
      {status ? (
        <TooltipValidateDefault
          value={value}
          field={field}
          defaultValue={defaultValue}
          type={type}
          active={active}
          setActiveError={setActiveError}
        />
      ) : (
        ""
      )}
    </div>
  );
}
