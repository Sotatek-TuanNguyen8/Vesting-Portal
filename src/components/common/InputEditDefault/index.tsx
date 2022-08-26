import { useState } from "react";
import TooltipValidateDefault from "./ValidateEditInputDefault";
import useStyles from "./style";

type InputProps = {
  value: any;
  status: boolean;
  field: string;
  type: string;
  onChange: (e: any, field: any) => void;
  defaultValue: string;
};
export default function InputTableEditDefault(props: InputProps) {
  const { value, status, onChange, field, type, defaultValue } = props;
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <input
        type={type}
        className={` ${!status ? styles.hiddenInput : styles.input} `}
        value={value}
        disabled={!status}
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
