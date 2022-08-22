import { InputLabel, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RoundCancelIcon } from "../../../assets/svgs";
import { forgotPWlAuth } from "../../../service";
import { FORGOT_PASSWORD } from "../../../utils/common/message-sign";
import useMetaMask from "../../../utils/hooks/useMetaMask";
import { LayoutPass } from "../../layouts/LayoutPass";
import useStyles from "./style";
type Props = {};

export default function ForgotPasswordPage({}: Props) {
  const classes = useStyles();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [messError, setMessError] = useState<string>();
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [isClickFirst, setIsClickFirst] = useState<boolean>(false);

  const { account, connect, getSignature, isNotMetaMask } = useMetaMask();

  const watchEmail = watch("email");

  const handleConnect = async () => {
    if (!account) {
      await connect();
    }
    const signature = await getSignature(FORGOT_PASSWORD);
    return signature;
  };

  const handleForgot = async (data: { email: string }) => {
    setIsClickFirst(true);
    const res = await forgotPWlAuth({
      email: data.email,
    });
    if (res?.error) {
      const { statusCode } = res?.error;
      if (statusCode === 406) {
        if (!isNotMetaMask()) {
          toast.error("Please install extension MetaMask");
          window.open("https://metamask.io/");
        } else {
          try {
            const signature = await handleConnect();
            const response = await forgotPWlAuth(
              {
                email: data.email,
                signature: signature,
                wallet_address: account,
              },
              FORGOT_PASSWORD
            );
            if (response?.error) {
              setMessError("Email and Wallet address do not match");
            } else {
              setMessError("");
              setIsSendEmail(true);
            }
          } catch (error: any) {
            setIsClickFirst(false);
            toast.error(error?.message);
          }
        }
      } else {
        setMessError(res?.error?.details);
      }
    } else {
      setMessError("");
      setIsSendEmail(true);
    }
    setIsClickFirst(false);
  };

  return (
    <LayoutPass>
      <div className={classes.forgot}>
        <Typography variant="h5" className={classes.title}>
          Forgot Password
        </Typography>

        {isSendEmail ? (
          <div>
            <div className={classes.verification}>
              A verification email has been sent to this email address{" "}
              {watchEmail}. Please verify it.
            </div>
            <Link to="/sign-in" className={classes.actionOK}>
              OK
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit((data) => {
              handleForgot(data);
            })}
          >
            <div className={classes.inputForm}>
              <InputLabel>
                Please enter the email you use to sign in.
              </InputLabel>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { value, onChange, ref },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <TextField
                        id="email"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={onChange}
                        value={value.trim()}
                        inputRef={ref}
                        error={!!error?.message}
                        placeholder="Email address"
                      />
                      {messError && (
                        <div className={classes.inputError}>
                          <RoundCancelIcon />
                          <p>{messError}</p>
                        </div>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className={classes.action}>
              <Link to="/sign-in" className="btnCancel">
                <span>Cancel</span>
              </Link>
              <button
                type="submit"
                className="btnContinue"
                disabled={
                  !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
                    watchEmail
                  ) || isClickFirst
                }
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
    </LayoutPass>
  );
}