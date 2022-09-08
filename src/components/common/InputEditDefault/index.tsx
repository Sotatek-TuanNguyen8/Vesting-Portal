import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format_thousands_decimal } from "../../../utils/common/fn";
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
  const shortNumber = (value?: string) => {
    if (value && value.length > 10) {
      return (value.slice(0, 3) + "..." + value.slice(-4)).toLowerCase();
    } else {
      return value;
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
      ) : value.length > 10 ? (
        type === "number" && field !== "tge_amount" ? (
          <div className={styles.hoverTokenAmount}>
            <p>{shortNumber(value)}</p>
            <div className="valueTokenAmount">
              <p>{format_thousands_decimal(value)}</p>
            </div>
          </div>
        ) : (
          <p>
            {value} {field === "tge_amount" && "%"}
          </p>
        )
      ) : (
        <p>
          {type === "number" && field !== "tge_amount"
            ? format_thousands_decimal(value)
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
