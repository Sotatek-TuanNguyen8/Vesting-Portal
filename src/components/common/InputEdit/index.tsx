import { useCallback } from "react";
import { useSelector } from "react-redux";
import { format_thousands_decimal } from "../../../utils/common/fn";
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
  msgTokenAmount?: string;
  onChange: (e: any, field: any) => void;
  isFixed?: boolean;
  hasProof?: boolean;
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
    msgTokenAmount,
    isFixed,
    hasProof,
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

  const shortenAddress = (
    string?: string,
    start?: number,
    end?: number
  ): string => {
    if (typeof string !== "string") return "";
    return (
      string.slice(0, start || 7) +
      "..." +
      string.slice(-(end || 6))
    ).toLowerCase();
  };

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
        return status && defaultValue ? (
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
        ) : (
          <div className={styles.email}>
            <p className="formatEmail">{value}</p>
            {value && (
              <div className="valueEmail">
                <p>{value}</p>
              </div>
            )}
          </div>
        );
      case "wallet_address":
        return status && defaultValue ? (
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
        ) : (
          <div className={styles.email}>
            <p className="formatEmail">{shortenAddress(value, 4, 4)}</p>
            {value && (
              <div className="valueEmail">
                <p>{value}</p>
              </div>
            )}
          </div>
        );
      case "allocation_token":
        return (
          <>
            {!status || !defaultValue || (!isFixed && hasProof) ? (
              <span className={styles.hiddenToken}>
                {format_thousands_decimal(value)}
              </span>
            ) : (
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
                onChange={(e) => onChange(e.target.value, field)}
              />
            )}
          </>
        );
    }
  }, [
    defaultValue,
    field,
    hasProof,
    isFixed,
    onChange,
    status,
    statusEditEmail,
    statusEditFullName,
    statusEditTokenAmount,
    statusEditWallet,
    styles.email,
    styles.hiddenInput,
    styles.hiddenInputFullname,
    styles.hiddenToken,
    styles.input,
    styles.inputError,
    styles.inputFullname,
    styles.inputFullnameError,
    value,
  ]);

  return (
    <div className={styles.wrapper}>
      {renderInputField()}
      {status ? (
        <TooltipValidate
          value={value}
          field={field}
          defaultValue={defaultValue}
          isDuplicateEmail={isDuplicateEmail}
          isDuplicateWallet={isDuplicateWallet}
          tokenAmountInvalid={tokenAmountInvalid}
          msgTokenAmount={msgTokenAmount}
        />
      ) : (
        ""
      )}
    </div>
  );
}
