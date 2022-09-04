import { ethers } from "ethers";
import { isNumber, toNumber } from "lodash";
import { useCallback, useState } from "react";
import useStyles from "./style";

type Props = {
  value: string;
  field?: string;
  defaultValue?: string;
  type?: string | undefined;
  active?: boolean;
};
export default function TooltipValidateDefault(props: Props) {
  const { value, field, defaultValue, type, active } = props;
  const styles = useStyles();
  const [getError, setGetError] = useState({});
  const renderMsgErrer = useCallback(() => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // if (!defaultValue) return;
    if (
      (!value && defaultValue) ||
      (!value && active) ||
      (toNumber(value) === 0 && active)
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
      toNumber(value) > 1000000 &&
      field !== "tge_amount"
    ) {
      return <p>Token amount of this investor cannot exceed 1000000</p>;
    } else if (field === "tge_amount" && toNumber(value) > 100) {
      return <p>Token amount of this investor cannot exceed 100%</p>;
    } else if (value === null && field === "vesting_type") {
      return <p>Please select option</p>;
    } else if (
      type === "number" &&
      toNumber(value) === 0 &&
      defaultValue !== ""
    ) {
      return <p>Input value must be than 0</p>;
    } else {
      return "";
    }
  }, [field, value]);

  const renderMsgValidateFullName = useCallback(() => {
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
