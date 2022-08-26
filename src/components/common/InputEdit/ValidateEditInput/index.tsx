import { ethers } from "ethers";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setStatusEmailEdit,
  setStatusFullNameEdit,
  setStatusTokenAmountEdit,
  setStatusWalletEdit,
} from "../../../../store/action";
import useStyles from "./style";

type Props = {
  value: string;
  field: string;
  defaultValue: string;
  isDuplicateEmail?: boolean;
  isDuplicateWallet?: boolean;
  tokenAmountInvalid?: boolean;
};
export default function TooltipValidate(props: Props) {
  const {
    value,
    field,
    defaultValue,
    tokenAmountInvalid,
    isDuplicateWallet,
    isDuplicateEmail,
  } = props;
  const styles = useStyles();

  const dispatch = useDispatch();

  const renderMsgErrorFullName = useCallback(() => {
    if (!value) {
      dispatch(setStatusFullNameEdit(true));
      return <p>This field is required</p>;
    } else if (
      /^[a-zA-Z]+[ ](([a-zA-Z ])+[a-zA-Z]*)*$/g.test(value) === false
    ) {
      dispatch(setStatusFullNameEdit(true));
      return <p>Special characters are not allowed</p>;
    } else if (value.length > 255) {
      dispatch(setStatusFullNameEdit(true));
      return <p>Enter less than 255 characters</p>;
    } else {
      dispatch(setStatusFullNameEdit(false));
    }
  }, [dispatch, value]);

  const renderMsgErrorEmail = useCallback(() => {
    if (!value) {
      dispatch(setStatusEmailEdit(true));
      return <p>This field is required</p>;
    } else if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
        value
      ) === false
    ) {
      dispatch(setStatusEmailEdit(true));
      return <p>Enter a valid email</p>;
    } else if (isDuplicateEmail) {
      dispatch(setStatusEmailEdit(true));
      return <p>Email has been used by another user</p>;
    } else {
      dispatch(setStatusEmailEdit(false));
    }
  }, [dispatch, isDuplicateEmail, value]);

  const renderMsgErrorWallet = useCallback(() => {
    if (!value) {
      dispatch(setStatusWalletEdit(true));
      return <p>This field is required</p>;
    } else if (!ethers.utils.isAddress(value)) {
      dispatch(setStatusWalletEdit(true));
      return <p>Enter a valid wallet address</p>;
    } else if (isDuplicateWallet) {
      dispatch(setStatusWalletEdit(true));
      return <p>Wallet address has been connected to another account</p>;
    } else {
      dispatch(setStatusWalletEdit(false));
    }
  }, [dispatch, isDuplicateWallet, value]);

  const renderMsgErrorInvalidToken = useCallback(() => {
    if (tokenAmountInvalid) {
      dispatch(setStatusTokenAmountEdit(true));
      return <p>Token amount of this investor cannot exceed 1000000</p>;
    } else {
      dispatch(setStatusTokenAmountEdit(false));
    }
  }, [dispatch, tokenAmountInvalid]);

  const renderMsgErrorInput = useCallback(() => {
    switch (field) {
      case "full_name":
        return renderMsgErrorFullName();
      case "email":
        return renderMsgErrorEmail();
      case "wallet_address":
        return renderMsgErrorWallet();
      case "allocation_token":
        return renderMsgErrorInvalidToken();
      default:
        return null;
    }
  }, [
    field,
    renderMsgErrorEmail,
    renderMsgErrorFullName,
    renderMsgErrorInvalidToken,
    renderMsgErrorWallet,
  ]);

  const renderMsgError = useCallback(() => {
    if (!defaultValue) return;
    if (field !== "allocation_token") {
      return renderMsgErrorInput();
    } else {
      return "";
    }
  }, [defaultValue, field, renderMsgErrorInput]);

  const renderMsgValidateFullName = useCallback(() => {
    return (
      <>
        {renderMsgError() ? (
          <>
            <img src="/images/iconTooltip.svg" alt="" />
            <div className="onHoverTooltip">{renderMsgError()}</div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }, [renderMsgError]);

  const renderTooltipValidate = useCallback(() => {
    switch (field) {
      case "full_name":
      case "email":
      case "wallet_address":
      case "allocation_token":
        return renderMsgValidateFullName();
    }
  }, [field, renderMsgValidateFullName]);

  return <div className={styles.wrapper}>{renderTooltipValidate()}</div>;
}
