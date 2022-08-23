import { type } from "os";
import React from "react";
import useStyles from "./style";

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
    <input
      className={` ${!status ? styles.input : ""} `}
      value={value}
      disabled={!status}
      onChange={(e) => onChange(e.target.value, field)}
    />
  );
}
