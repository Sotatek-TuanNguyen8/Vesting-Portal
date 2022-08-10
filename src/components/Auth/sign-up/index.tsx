import { Button, FormLabel, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.scss";

type Props = {};

interface SignUpForm {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function SignUp({}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const watchConfirmPassword = watch("confirm_password");
  const watchPassword = watch("password");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <div className={styles.inputForm}>
        <Typography variant="subtitle1">Full Name</Typography>
        <Controller
          control={control}
          name="full_name"
          rules={{
            required: "Nhap truong",
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
            required: "Nhap truong",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Not Email",
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
        <Typography variant="subtitle1">Pass Word</Typography>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Nhap truong",
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
        <Typography variant="subtitle1">Confirm Password</Typography>
        <Controller
          control={control}
          name="confirm_password"
          rules={{
            required: "Nhap truong",
            validate: {
              confirmPassword: () =>
                watchConfirmPassword === watchPassword || "Confirm Password",
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
      <Button type="submit">SIGN UP</Button>
    </form>
  );
}
