import { useState } from "react";
import useStyles from "./style";

type InputProps = {
  value: any;
  status: boolean;
  field: string;
  type: string;
  onChange: (e: any, field: any) => void;
};
export default function InputTableEditDefault(props: InputProps) {
  const { value, status, onChange, field, type } = props;
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
    </div>
  );
}
