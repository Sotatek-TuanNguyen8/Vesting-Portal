import { ethers } from "ethers";
import { isNumber, toNumber } from "lodash";
import { useCallback } from "react";
import useStyles from "./style";

type Props = {
  value: string;
  field: string;
  defaultValue?: string;
  type?: string;
};
export default function TooltipValidateDefault(props: Props) {
  const { value, field, defaultValue, type } = props;
  const styles = useStyles();
  const renderMsgErrer = useCallback(() => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // if (!defaultValue) return;
    if (!value && defaultValue) {
      return <p>This field is required</p>;
    } else if (field === "name" && specialChars.test(value)) {
      return <p>Special characters are not allowed</p>;
    } else if (value.length > 255) {
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
    } else if (type === "number" && toNumber(value) > 10000000) {
      return <p>Token amount of this investor cannot exceed 10000000</p>;
    } else if (field === "tge_amount" && toNumber(value) > 100) {
      return <p>Token amount of this investor cannot exceed 100%</p>;
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
            <div className="onHoverTooltip">{renderMsgErrer()}</div>
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
        return renderMsgValidateFullName();
    }
  }, [field, renderMsgValidateFullName]);

  return <div className={styles.wrapper}>{renderTooltipValidate()}</div>;
}
