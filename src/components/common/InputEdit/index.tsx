import { useCallback } from "react";
import { useSelector } from "react-redux";
import useStyles from "./style";
import TooltipValidate from "./ValidateEditInput";

type InputProps = {
  value: any;
  status: boolean;
  field: string;
  defaultValue: string;
  isDuplicateEmail?: boolean;
  isDuplicateWallet?: boolean;
  tokenAmountInvalid?: boolean;
  onChange: (e: any, field: any) => void;
};
export default function InputTableEdit(props: InputProps) {
  const {
    value,
    status,
    onChange,
    field,
    defaultValue,
    isDuplicateEmail,
    isDuplicateWallet,
    tokenAmountInvalid,
  } = props;
  const styles = useStyles();

  const statusEditFullName = useSelector(
    (state: any) => state.statusFullNameEditAction.statusFullName
  );

  const statusEditEmail = useSelector(
    (state: any) => state.statusEmailEditAction.statusEmail
  );

  const statusEditWallet = useSelector(
    (state: any) => state.statusWalletEditAction.statusWallet
  );

  const statusEditTokenAmount = useSelector(
    (state: any) => state.statusTokenAmountEditAction.statusTokenAmount
  );

  console.log(statusEditFullName);

  const renderInputField = useCallback(() => {
    switch (field) {
      case "full_name":
        return (
          <>
            <input
              className={` ${
                !status || !defaultValue
                  ? styles.hiddenInputFullname
                  : statusEditFullName
                  ? styles.inputFullnameError
                  : styles.inputFullname
              } `}
              value={value}
              disabled={!status || !defaultValue}
              onChange={(e) => onChange(e.target.value, field)}
            />
          </>
        );
      case "email":
        return (
          <input
            className={` ${
              !status || !defaultValue
                ? styles.hiddenInput
                : statusEditEmail
                ? styles.inputError
                : styles.input
            } `}
            value={value}
            disabled={!status || !defaultValue}
            onChange={(e) => onChange(e.target.value, field)}
          />
        );
      case "wallet_address":
        return (
          <input
            className={` ${
              !status || !defaultValue
                ? styles.hiddenInput
                : statusEditWallet
                ? styles.inputError
                : styles.input
            } `}
            value={value}
            disabled={!status || !defaultValue}
            onChange={(e) => onChange(e.target.value, field)}
          />
        );
      case "allocation_token":
        return (
          <input
            className={` ${
              !status || !defaultValue
                ? styles.hiddenInput
                : statusEditTokenAmount
                ? styles.inputError
                : styles.input
            } `}
            value={value}
            type="number"
            min={0}
            disabled={!status || !defaultValue}
            onChange={(e) => onChange(Number(e.target.value), field)}
          />
        );
    }
  }, [
    defaultValue,
    field,
    onChange,
    status,
    statusEditEmail,
    statusEditFullName,
    statusEditTokenAmount,
    statusEditWallet,
    styles.hiddenInput,
    styles.hiddenInputFullname,
    styles.input,
    styles.inputError,
    styles.inputFullname,
    styles.inputFullnameError,
    value,
  ]);

  return (
    <div className={styles.wrapper}>
      {/* {field === "allocation_token" ? (
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
      )} */}
      {renderInputField()}
      {status ? (
        <TooltipValidate
          value={value}
          field={field}
          defaultValue={defaultValue}
          isDuplicateEmail={isDuplicateEmail}
          isDuplicateWallet={isDuplicateWallet}
          tokenAmountInvalid={tokenAmountInvalid}
        />
      ) : (
        ""
      )}
    </div>
  );
}
