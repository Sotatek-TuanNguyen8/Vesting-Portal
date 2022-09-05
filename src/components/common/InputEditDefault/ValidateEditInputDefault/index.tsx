import { ethers } from "ethers";
import _, { isNumber, toNumber } from "lodash";
import { useCallback, useState } from "react";
import useStyles from "./style";

type Props = {
  value: string;
  field?: string;
  defaultValue?: string;
  type?: string | undefined;
  active?: boolean;
  setActiveError: (value: boolean) => void;
};
export default function TooltipValidateDefault(props: Props) {
  const { value, field, defaultValue, type, active, setActiveError } = props;
  const styles = useStyles();
  const renderMsgErrer = useCallback(() => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // if (!defaultValue) return;
    if (
      (!value && defaultValue) ||
      (!value && active) 
    ) {
      return <p>This field is required</p>;
    } else if (field === "name" && specialChars.test(value)) {
      return <p>Special characters are not allowed</p>;
    } else if (value?.length > 255) {
      return <p>Enter less than 255 characters</p>;
    } else if (
      field === "email" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
        value,
      ) === false
    ) {
      return <p>Enter a valid email</p>;
    } else if (field === "wallet_address" && !ethers.utils.isAddress(value)) {
      return <p>Enter a valid wallet address</p>;
    } else if (
      type === "number" &&
      _.toNumber(value) > 1000000 &&
      field !== "tge_amount"
    ) {
      return <p>Token amount of this investor cannot exceed 1000000</p>;
    } else if (field === "tge_amount" && _.toNumber(value) > 100) {
      return <p>Token amount of this investor cannot exceed 100%</p>;
    } else if (value === null && field === "vesting_type") {
      return <p>Please select option</p>;
    } else if (
      type === "number" &&
      _.toNumber(value) <= 0 
    ) {
      return <p>Input value must be than 0</p>;
    } else {
      return "";
    }
  }, [field, value]);

  const renderMsgValidateFullName = useCallback(() => {
    if (renderMsgErrer()) {
      setActiveError(true);
    } else {
      setActiveError(false);
    }
    return (
      <>
        {renderMsgErrer() ? (
          <>
            <img src="/images/iconTooltip.svg" alt="" />
            <div
              className={type === "select" ? "selectHover" : "onHoverTooltip"}
            >
              {renderMsgErrer()}
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }, [renderMsgErrer]);

  const renderTooltipValidate = useCallback(() => {
    switch (field) {
      case "name":
      case "email":
      case "tge_amount":
      case "token_amount":
      case "cliff":
      case "linear_vesting":
      case "wallet_address":
      case "vesting_type":
        return renderMsgValidateFullName();
    }
  }, [field, renderMsgValidateFullName]);

  return <div className={styles.wrapper}>{renderTooltipValidate()}</div>;
}
