import { InputLabel, TextField, Typography } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RoundCancelIcon } from "../../../assets/svgs";
import { forgotPWlAuth } from "../../../service";
import { FORGOT_PASSWORD } from "../../../utils/common/message-sign";
import useMetaMask from "../../../utils/hooks/useMetaMask";
import DefaultLayout from "../../common/DefaultLayout";
import Loading from "../../common/Loading";
import useStyles from "./style";

export default function ForgotPasswordPage() {
  const classes = useStyles();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [messError, setMessError] = useState<string>();
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [isClickFirst, setIsClickFirst] = useState<boolean>(false);
  const [checkConnect, setCheckConnect] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const watchEmail = watch("email");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { account, connect, getSignature } = useMetaMask();
  const { library } = useWeb3React();

  useEffect(() => {
    if (!account || !library || !checkConnect || !email) return;
    (async () => {
      const signature = await getSignature(FORGOT_PASSWORD, library);
      if (signature) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, error] = await forgotPWlAuth(
          {
            email,
            signature: signature,
            wallet_address: account,
          },
          FORGOT_PASSWORD
        );
        if (error) {
          setMessError(error?.error?.details);
        } else {
          setMessError("");
          setIsSendEmail(true);
        }
      }
      setCheckConnect(false);
      setIsClickFirst(false);
    })();
  }, [account, checkConnect, email, getSignature, library]);

  const handleForgot = async (data: { email: string }) => {
    setIsClickFirst(true);
    setMessError("");
    setIsLoading(true);
    const [res, error] = await forgotPWlAuth({
      email: data.email,
    });
    if (res) {
      setMessError("");
      setIsSendEmail(true);
    } else {
      setIsLoading(false);
      const { statusCode } = error?.error;
      if (statusCode === 406) {
        if (!account) {
          await connect();
        }
        setCheckConnect(true);
      } else {
        setMessError(error?.error?.details);
        setIsClickFirst(false);
      }
    }
    setIsLoading(false);
  };

  return (
    <DefaultLayout>
      <>
        <Loading open={isLoading} />
        <div className={classes.forgot}>
          <Typography variant="h5" className={classes.title}>
            Forgot Password
          </Typography>

          {isSendEmail ? (
            <div>
              <div className={classes.verification}>
                A password recovery email has been sent to this email address{" "}
                <span>{watchEmail}</span>
              </div>
              <Link to="/sign-in" className={classes.actionOK}>
                OK
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit((data) => {
                handleForgot(data);
                setEmail(data.email);
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
      </>
    </DefaultLayout>
  );
}
