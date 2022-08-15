import { Button, TextField, Typography } from "@material-ui/core";
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
  } = useForm<SignUpForm>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  // const [errorPass, setErrorPas] = useState(false);
  const watchConfirmPassword = watch("confirm_password");
  const watchPassword = watch("password");

  // useEffect(() => {
  //   setErrorPas(watchConfirmPassword !== watchPassword);
  // }, [watchConfirmPassword, watchPassword]);

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit((data) => {
          data.confirm_password !== data.password
            ? setError("confirm_password", {
                type: "confirm_password",
                message: "Wrong password!",
              })
            : console.log(data);
        })}
        className={styles.form}
      >
        <div className={styles.inputForm}>
          <Typography variant="subtitle1">Full Name</Typography>
          <Controller
            control={control}
            name="full_name"
            rules={{
              required: "This field cannot be empty.",
            }}
            render={({
              field: { value, onChange, ref },
              fieldState: { error },
            }) => {
              return (
                <>
                  <TextField
                    id="standard-number"
                    onChange={onChange}
                    inputRef={ref}
                    value={value}
                    error={!!error?.message}
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
          <Typography variant="subtitle1">Email</Typography>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "This field cannot be empty.",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address!",
              },
            }}
            render={({
              field: { value, onChange, ref },
              fieldState: { error },
            }) => {
              return (
                <>
                  <TextField
                    id="standard-number"
                    onChange={onChange}
                    value={value}
                    inputRef={ref}
                    error={!!error?.message}
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
          <Typography variant="subtitle1">Password</Typography>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "This field cannot be empty.",
            }}
            render={({
              field: { value, onChange, ref },
              fieldState: { error },
            }) => {
              return (
                <>
                  <TextField
                    id="standard-number"
                    onChange={onChange}
                    inputRef={ref}
                    value={value}
                    error={!!error?.message}
                    type="password"
                  />
                  {error && error.message && (
                    <p className={styles.inputError}>{error.message}</p>
                  )}
                  <div className={styles.passwordLength}>
                    <div className={styles.weak}>
                      <div className={styles.line}></div>
                      <span>Weak</span>
                    </div>
                    <div className={styles.medium}>
                      <div className={styles.line}></div>
                    </div>
                    <div className={styles.strong}>
                      <div className={styles.line}></div>
                      <span>Strong</span>
                    </div>
                  </div>
                </>
              );
            }}
          />
        </div>
        <div className={styles.inputForm}>
          <Typography variant="subtitle1">Confirm Password</Typography>
          <Controller
            control={control}
            name="confirm_password"
            rules={{
              required: "This field cannot be empty.",
            }}
            render={({
              field: { value, onChange, ref },
              fieldState: { error },
            }) => {
              return (
                <>
                  <TextField
                    id="standard-number"
                    onChange={onChange}
                    inputRef={ref}
                    value={value}
                    error={!!error?.message}
                    type="password"
                  />
                  {error && error.message && (
                    <p className={styles.inputError}>{error.message}</p>
                  )}
                  {/* {errorPass && (
                    <p className={styles.inputError}>Wrong password</p>
                  )} */}
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
