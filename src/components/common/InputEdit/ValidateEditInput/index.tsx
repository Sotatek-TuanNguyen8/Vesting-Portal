import { ethers } from "ethers";
import { useCallback } from "react";
import useStyles from "./style";

type Props = {
  value: string;
  field: string;
  defaultValue: string;
};
export default function TooltipValidate(props: Props) {
  const { value, field, defaultValue } = props;
  const styles = useStyles();

  const renderMsgErrer = useCallback(() => {
    if (!defaultValue) return;
    if (!value) {
      return <p>This field is required</p>;
    } else if (
      field === "full_name" &&
      /^[a-zA-Z]+[ ](([a-zA-Z ])+[a-zA-Z]*)*$/g.test(value) === true
    ) {
      return <p>Special characters are not allowed</p>;
    } else if (value.length > 255) {
      return <p>Enter less than 255 characters</p>;
    } else if (
      field === "email" &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
        value
      ) === false
    ) {
      return <p>Enter a valid email</p>;
    } else if (field === "wallet_address" && !ethers.utils.isAddress(value)) {
      return <p>Enter a valid wallet address</p>;
    } else {
      return "";
    }
  }, [defaultValue, field, value]);

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
      case "full_name":
      case "email":
      case "wallet_address":
        return renderMsgValidateFullName();
    }
  }, [field, renderMsgValidateFullName]);

  return <div className={styles.wrapper}>{renderTooltipValidate()}</div>;
}
