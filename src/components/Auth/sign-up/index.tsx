import { ToolTipIcon, Visibility, VisibilityOff } from "@/assets/svgs";
import {
  isNotLowerCase,
  isNotNumber,
  isNotSpecialCharacters,
  isNotUpperCase,
  standardRules,
} from "@/utils/regex";
import {
  Button,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthLayout from "..";
import styles from "./styles.module.scss";

type Props = {};

interface SignUpForm {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function SignUpPage({}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    getValues,
    setValue,
  } = useForm<SignUpForm>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const [stylePassWord, setStylePassWord] = useState<number>(0);
  const watchPassword = watch("password");
  const watchFullName = watch("full_name");

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (!watchFullName) return;
    setValue(
      "full_name",
      watchFullName
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
        .replace(/ì|í|ị|ỉ|ĩ/g, "i")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
        .replace(/đ/g, "d")
    );
  }, [watchFullName, setValue]);

  const validatePassWord = () => {
    if (watchPassword.length < 8) return;
    if (
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*?[#?!_@$%^&*-])[a-zA-Z\d#?!_@$%^&*-]{8,}$/g.test(
        watchPassword
      )
    ) {
      setStylePassWord(3);
      console.log("strong");
    } else if (
      isNotNumber.test(watchPassword) ||
      isNotLowerCase.test(watchPassword) ||
      isNotUpperCase.test(watchPassword) ||
      isNotSpecialCharacters.test(watchPassword)
    ) {
      setStylePassWord(2);
      console.log("normal");
    } else {
      setStylePassWord(1);
      console.log("weak");
    }
  };
  useEffect(() => {
    validatePassWord();
  }, [watchPassword]);

  const styleInPassWord = (value: number) => {
    switch (value) {
      case 3: {
        return "strong";
      }
      case 2: {
        return "weak";
      }
      case 1: {
        return "normal";
      }
      default:
        return "default";
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit((data) => {
          data.confirm_password !== data.password
            ? setError("confirm_password", {
                type: "confirm_password",
                message: "Passwords do not match",
              })
            : console.log(data);
        })}
        className={styles.form}
      >
        <div className={styles.inputForm}>
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
                value: /^([a-zA-Z0-9])+/g,
                message: "Latin Name",
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
                    onChange={onChange}
                    inputRef={ref}
                    value={value}
                    error={!!error?.message}
                    label="Full Name"
                  />
                  {error && error.message && (
                    <p className={styles.inputError}>{error.message}</p>
                  )}
                </>
              );
            }}
          />
        </div>
        <div className={styles.inputForm}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "This field is required",
              maxLength: {
                value: 8,
                message: "Minium 8 characters",
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
                    onChange={onChange}
                    value={value.trim()}
                    inputRef={ref}
                    error={!!error?.message}
                    label="Email"
                    autoComplete="off"
                  />
                  {error && error.message && (
                    <p className={styles.inputError}>{error.message}</p>
                  )}
                </>
              );
            }}
          />
        </div>
        <div className={styles.inputForm}>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "This field is required",
            }}
            render={({
              field: { value, onChange, ref },
              fieldState: { error },
            }) => {
              return (
                <>
                  <TextField
                    id="adornment-password"
                    type={showPassword.password ? "text" : "password"}
                    value={value.trim().replaceAll(/\s/g, "")}
                    autoComplete="off"
                    onChange={onChange}
                    label="Password"
                    error={!!error?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowPassword((prev) => ({
                                ...prev,
                                password: !prev.password,
                              }))
                            }
                          >
                            {showPassword.password ? (
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
                    <p className={styles.inputError}>{error.message}</p>
                  )}
                  {watchPassword.length >= 8 && (
                    <div className={styles.passwordLength}>
                      <div
                        className={
                          stylePassWord === 1
                            ? styles.weak
                            : stylePassWord === 2
                            ? styles.normal
                            : styles.strong
                        }
                      >
                        <div className={styles.line}></div>
                      </div>
                      <div
                        className={clsx(
                          stylePassWord < 2
                            ? styles.default
                            : stylePassWord === 2
                            ? styles.normal
                            : styles.strong
                        )}
                      >
                        <div className={styles.line}></div>
                      </div>
                      <div
                        className={clsx(
                          stylePassWord < 3 ? styles.default : styles.strong
                        )}
                      >
                        <div className={styles.line}></div>
                      </div>
                    </div>
                  )}
                  <Tooltip
                    title="Your password must be 8 characters minimum and
should contain lowercase letter, uppercase letter, 
number and special character."
                    arrow
                  >
                    <span style={{ marginTop: 12, display: "inline-block" }}>
                      <ToolTipIcon />
                    </span>
                  </Tooltip>
                </>
              );
            }}
          />
        </div>
        <div className={styles.inputForm}>
          <Controller
            control={control}
            name="confirm_password"
            rules={{
              required: "This field is required",
            }}
            render={({
              field: { value, onChange, ref },
              fieldState: { error },
            }) => {
              return (
                <>
                  <TextField
                    id="adornment-confirm-password"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    value={value.trim().replaceAll(/\s/g, "")}
                    onChange={onChange}
                    label="Confirm Password"
                    error={!!error?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() =>
                              setShowPassword((prev) => ({
                                ...prev,
                                confirmPassword: !prev.confirmPassword,
                              }))
                            }
                          >
                            {showPassword.confirmPassword ? (
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
                    <p className={styles.inputError}>{error.message}</p>
                  )}
                </>
              );
            }}
          />
        </div>
        <Button type="submit" className={styles.btnSingUp}>
          SIGN UP
        </Button>
        <div>
          <Typography variant="subtitle1">
            Already have an account?
            <Link href="/login">
              <span className={styles.textSignUp}> Login</span>
            </Link>
          </Typography>
        </div>
      </form>
    </AuthLayout>
  );
}
