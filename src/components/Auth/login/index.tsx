import { Visibility, VisibilityOff } from "@/assets/svgs";
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthLayout from "..";
import styles from "./styles.module.scss";
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
          // document.cookie = `email=${data.email}; path=/`;
          // document.cookie = `pw=${data.password}; path=/`;
        })}
        className={styles.form}
      >
        <div className={styles.inputForm}>
          <Controller
            control={control}
            name="email"
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
                    id="standard-number"
                    onChange={onChange}
                    inputRef={ref}
                    value={value}
                    error={!!error?.message}
                    label="Email"
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
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    label="Password"
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
