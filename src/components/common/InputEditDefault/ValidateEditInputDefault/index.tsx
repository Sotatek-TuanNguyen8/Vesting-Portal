import _ from "lodash";
import { useCallback } from "react";
import { useAppSelector } from "../../../../store/reducers";
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

  const msgErrTokenAmount = useAppSelector(
    (state) => state.msgErrTokenAmountEditReducer.msgErrTokenAmount
  );

  const renderMsgErrer = useCallback(() => {
    // const specialChars = /[]/;

    if (((!value && defaultValue) || (!value && active)) && field === "name") {
      return <p>This field is required</p>;
    }
    //  else if (field === "name" && specialChars.test(value)) {
    //   return <p>Special characters are not allowed</p>;
    // }
    else if (value?.length > 255) {
      return <p>Enter less than 255 characters</p>;
    } else if (field === "token_amount" && !!msgErrTokenAmount) {
      return <p>{msgErrTokenAmount}</p>;
    } else if (field === "tge_amount" && _.toNumber(value) > 100) {
      return <p>Token amount of this investor cannot exceed 100%</p>;
    } else if (!value && field === "vesting_type") {
      return <p>Please select option</p>;
    }
    // else if (type === "number" && _.toNumber(value) <= 0) {
    //   return <p>Input value must be than 0</p>;
    // }
    else {
      return "";
    }
  }, [active, defaultValue, field, msgErrTokenAmount, value]);

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
  }, [renderMsgErrer, setActiveError, type]);

  const renderTooltipValidate = useCallback(() => {
    switch (field) {
      case "name":
      case "tge_amount":
      case "token_amount":
      case "linear_vesting":
      case "vesting_type":
        return renderMsgValidateFullName();
    }
  }, [field, renderMsgValidateFullName]);

  return <div className={styles.wrapper}>{renderTooltipValidate()}</div>;
}
