import {
  Button,
  Checkbox,
  FilledInput,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthLayout from "..";
import styles from "./styles.module.scss";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";

type Props = {};

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage({}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className={styles.form}
      >
        <div className={styles.inputForm}>
          <Typography variant="subtitle1">Email</Typography>
          <Controller
            control={control}
            name="email"
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
                  <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={onChange}
                    value={value}
                    inputRef={ref}
                    error={!!error?.message}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {error && error.message && (
                    <p className={styles.inputError}>{error.message}</p>
                  )}
                </>
              );
            }}
          />
        </div>
        <div className={styles.boxAction}>
          <div className={styles.remember}>
            <input className={styles.checkbox} type="checkbox" />
            <p>Remember me</p>
          </div>
          <p className={styles.forgot}>Forgot Password</p>
        </div>
        <Button type="submit" className={styles.btnLogin}>
          LOGIN
        </Button>
        <div>
          <Typography variant="subtitle1">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up">
              <span className={styles.textSignUp}>Sign up</span>
            </Link>
          </Typography>
        </div>
      </form>
    </AuthLayout>
  );
}
