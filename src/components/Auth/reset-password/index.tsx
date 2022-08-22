import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToolTipIcon, Visibility, VisibilityOff } from "../../../assets/svgs";
import { resetPWlAuth } from "../../../service";
import { removeMark, validatePassWord } from "../../../utils/common/fn";
import { LayoutPass } from "../../layouts/LayoutPass";
import useStyles from "./style";
type Props = {};

interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}

export default function ResetPasswordPage({}: Props) {
  const classes = useStyles();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { control, handleSubmit, watch, setError, setValue } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const [stylePassWord, setStylePassWord] = useState<number>(0);
  const watchPassword = watch("password");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isClickFirst, setIsClickFirst] = useState<boolean>(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParams = params.get("email");
    const tokenParams = params.get("token");
    if (!emailParams || !tokenParams) {
      navigate("/sign-in");
    }
  }, [navigate]);

  useEffect(() => {
    setStylePassWord(validatePassWord(watchPassword));
  }, [watchPassword]);

  const handleResetPassword = async (data: ResetPasswordForm) => {
    if (data.confirm_password !== data.password) {
      setError("confirm_password", {
        type: "confirm_password",
        message: "Passwords do not match",
      });
    } else {
      setIsClickFirst(true);
      const res = await resetPWlAuth({
        email: email as string,
        token: token as string,
        password: data.password.trim(),
      });
      if (res?.error) {
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
      }
      setIsClickFirst(false);
    }
  };

  const onChangePassWork = (e: any) => {
    if (!/\s+/g.test(e.target.value)) {
      setValue("password", e.target.value);
    }
  };

  const onChangeConfirmPassWork = (e: any) => {
    if (!/\s+/g.test(e.target.value)) {
      setValue("confirm_password", e.target.value);
    }
  };

  return (
    <LayoutPass>
      <div className={classes.reset}>
        <Typography variant="h5" className={classes.title}>
          Reset Password
        </Typography>

        {isSuccess ? (
          <div className={classes.pwChange}>
            <div className="content">
              <p>Password Changed!</p>
              <span>Your password has been changed successfully</span>
            </div>
            <div className="actionBack">
              <Link to="/sign-in">
                <Button>Back To Login</Button>
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit((data) => handleResetPassword(data))}
            className={classes.form}
          >
            <div className={classes.inputForm}>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Minimum is 8 characters",
                  },
                }}
                render={({
                  field: { value, onChange, ref },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <TextField
                        id="adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={removeMark(value)}
                        autoComplete="off"
                        onChange={onChangePassWork}
                        label="Password"
                        error={!!error?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {error && error.message && (
                        <p className={classes.inputErrorPass}>
                          {error.message}
                        </p>
                      )}
                      {watchPassword.length >= 8 && (
                        <div className={classes.passwordLength}>
                          <div
                            className={
                              stylePassWord === 1
                                ? "weak"
                                : stylePassWord === 2
                                ? "normal"
                                : "strong"
                            }
                          >
                            <div className="line"></div>
                          </div>
                          <div
                            className={clsx(
                              stylePassWord < 2
                                ? "default"
                                : stylePassWord === 2
                                ? "normal"
                                : "strong"
                            )}
                          >
                            <div className="line"></div>
                          </div>
                          <div
                            className={clsx(
                              stylePassWord < 3 ? "default" : "strong"
                            )}
                          >
                            <div className="line"></div>
                          </div>
                        </div>
                      )}
                      <Tooltip
                        title="Your password must be 8 characters minimum and
should contain lowercase letter, uppercase letter, 
number and special character."
                        arrow
                      >
                        <span style={{ marginTop: 7, display: "inline-block" }}>
                          <ToolTipIcon />
                        </span>
                      </Tooltip>
                    </>
                  );
                }}
              />
            </div>
            <div className={classes.inputForm}>
              <Controller
                control={control}
                name="confirm_password"
                render={({
                  field: { value, onChange, ref },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <TextField
                        id="adornment-confirm-password"
                        type={showPassword ? "text" : "password"}
                        value={removeMark(value)}
                        onChange={onChangeConfirmPassWork}
                        label="Confirm Password"
                        error={!!error?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {error && error.message && (
                        <p className={classes.inputError}>{error.message}</p>
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className={classes.action}>
              <Link to="/sign-in" className="btnBack">
                Back to login
              </Link>
              <button
                type="submit"
                className="btnContinue"
                disabled={isClickFirst}
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
