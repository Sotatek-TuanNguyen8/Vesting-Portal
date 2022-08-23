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
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "..";
import { ToolTipIcon, Visibility, VisibilityOff } from "../../../assets/svgs";
import { authService } from "../../../service";
import { signUpResendSuccess } from "../../../store/action";
import { removeMark, validatePassWord } from "../../../utils/common/fn";
import useStyles from "./style";

type Props = {};

interface SignUpForm {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function SignUpPage({}: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stylePassWord, setStylePassWord] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isClickFirst, setIsClickFirst] = useState<boolean>(false);

  const { control, handleSubmit, watch, setError, setValue } =
    useForm<SignUpForm>({
      defaultValues: {
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
    });
  const watchPassword = watch("password");

  useEffect(() => {
    setStylePassWord(validatePassWord(watchPassword));
  }, [watchPassword]);

  const handleSingUp = async (data: SignUpForm) => {
    if (data.confirm_password !== data.password) {
      setError("confirm_password", {
        type: "confirm_password",
        message: "Passwords do not match",
      });
    } else {
      setIsClickFirst(true);
      const response = await authService.signUp({
        full_name: data.full_name.trim(),
        password: data.password.trim(),
        email: data.email.trim(),
      });
      if (response?.error) {
        if (response?.error?.statusCode === 409) {
          setError("email", {
            type: "conflict",
            message: "Email has already been taken",
          });
        } else {
          toast.error(response?.error?.message);
        }
      } else {
        dispatch(signUpResendSuccess({ email: data.email, type: "sign-up" }));
        navigate("/resend-email");
      }
      setIsClickFirst(false);
    }
  };

  const onChangeName = (e: any) => {
    const { value } = e.target;
    if (!value.toString().startsWith(" ")) {
      setValue("full_name", e.target.value.replace("  ", " "));
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

  const onChangeEmail = (e: any) => {
    if (!/\s+/g.test(e.target.value)) {
      setValue("email", e.target.value);
    }
  };

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    if (item) {
      navigate("/connect-wallet");
      return;
    }
  }, [navigate]);

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit((data) => handleSingUp(data))}
        className={classes.form}
      >
        <div className={classes.inputForm}>
          <Controller
            control={control}
            name="full_name"
            rules={{
              required: "This field is required",
              maxLength: {
                value: 255,
                message: "Enter less than 255 characters",
              },
              pattern: {
                value: /^[a-zA-Z]+[ ](([a-zA-Z ])+[a-zA-Z]*)*$/g,
                message: "Special characters are not allowed",
              },
            }}
            render={({
              field: { value, onChange, ref },
              fieldState: { error },
            }) => {
              return (
                <>
                  <TextField
                    id="full-name"
                    onChange={onChangeName}
                    inputRef={ref}
                    value={removeMark(value)}
                    error={!!error?.message}
                    label="Full Name"
                  />
                  {error && error.message && (
                    <p className={classes.inputError}>{error.message}</p>
                  )}
                </>
              );
            }}
          />
        </div>
        <div className={classes.inputForm}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "This field is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
                message: "Enter a valid email",
              },
            }}
            render={({
              field: { value, onChange, ref },
              fieldState: { error },
            }) => {
              return (
                <>
                  <TextField
                    id="email"
                    onChange={onChangeEmail}
                    value={value.trim()}
                    inputRef={ref}
                    error={!!error?.message}
                    label="Email"
                    autoComplete="off"
                  />
                  {error && error.message && (
                    <p className={classes.inputError}>{error.message}</p>
                  )}
                </>
              );
            }}
          />
        </div>
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {error && error.message && (
                    <p className={classes.inputErrorPass}>{error.message}</p>
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
                    <span style={{ marginTop: 20, display: "inline-block" }}>
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
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
        <Button
          type="submit"
          className={classes.btnSingUp}
          disabled={isClickFirst}
        >
          SIGN UP
        </Button>
        <div className={classes.footer}>
          <Typography variant="subtitle1">
            Already have an account?{" "}
            <Link to="/sign-in" className="textSignUp">
              Login
            </Link>
          </Typography>
        </div>
      </form>
    </AuthLayout>
  );
}
