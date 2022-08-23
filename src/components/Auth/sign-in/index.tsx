import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "..";
import { Visibility, VisibilityOff } from "../../../assets/svgs";
import { loginAuth } from "../../../service";
import { loginResendSuccess, setUser } from "../../../store/action";
import {
  getLocalStorage,
  setLocalStorage,
  useThrowableAsyncFn,
} from "../../hooks";
import useStyles from "./style";

interface LoginForm {
  email: string;
  password: string;
}

export default function SignInPage() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberme] = useState(false);
  const getRememberLogin = getLocalStorage("rememberLogin");
  const dispatch = useDispatch();
  const { control, handleSubmit, setError } = useForm<LoginForm>({
    defaultValues: {
      email: getRememberLogin?.email ?? "",
      password: getRememberLogin?.password ?? "",
    },
  });

  useEffect(() => {
    const item = localStorage.getItem("access_token");
    if (item) {
      navigate("/connect-wallet");
      return;
    }
  }, [navigate]);

  const [{ loading }, doSubmit] = useThrowableAsyncFn(
    async (body: LoginForm) => {
      const res = await loginAuth({
        email: body.email,
        password: body.password,
      });

      if (!res) throw new Error("Something goes wrong, please try again");
      if (res?.error) {
        if (res?.error?.statusCode === 404) {
          setError("email", {
            type: "conflict",
            message: "The email address isn't connected to an account.",
          });
        } else if (res?.error?.statusCode === 406) {
          setError("password", {
            type: "conflict",
            message: "The password that you've entered is incorrect.",
          });
        } else {
          toast.error(res?.error?.message);
        }
      } else {
        if (rememberMe) {
          await setLocalStorage(
            "rememberLogin",
            JSON.stringify({
              email: body.email,
              password: body.password,
            })
          );
        }
        setLocalStorage("access_token", res?.data?.accessToken);
        setLocalStorage("refresh_token", res?.data?.refreshToken);
        dispatch(
          setUser({
            id: res?.data?.user?.id,
            fullName: res?.data?.user?.full_name,
            email: res?.data?.user?.email,
            verifyAt: res?.data?.user?.send_verify_at,
            isVerify: res?.data?.user?.is_verified,
            metamaskAddress: res?.data?.user?.wallet ?? "",
            role: res?.data?.user?.role,
          })
        );

        if (res?.data?.user?.is_verified !== false) {
          navigate("/connect-wallet");
        } else {
          dispatch(
            loginResendSuccess({
              email: res?.data?.user?.email,
              type: "sign-in",
            })
          );
          navigate("/resend-email");
        }
      }
    },
    [rememberMe]
  );

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit((data) => {
          doSubmit(data);
        })}
        className={classes.form}
      >
        <div className={classes.inputForm}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Please enter email address",
              maxLength: {
                value: 250,
                message: "Too much characters",
              },
              max: 3,
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
                    id="standard-number"
                    onChange={onChange}
                    inputRef={ref}
                    value={value}
                    error={!!error?.message}
                    label="Email"
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
              required: "Please enter password",
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
                    <p className={classes.inputError}>{error.message}</p>
                  )}
                </>
              );
            }}
          />
        </div>
        <div className={classes.boxAction}>
          <div className="remember">
            <input
              className="checkbox"
              checked={rememberMe}
              type="checkbox"
              onChange={(e) => {
                setRememberme(e.target.checked);
              }}
            />
            <p>Remember me</p>
          </div>
          <Link to="/forgot-password" className="forgot">
            Forgot Password
          </Link>
        </div>
        <Button type="submit" className={classes.btnLogin} disabled={loading}>
          LOGIN
        </Button>
        <div className={classes.footer}>
          <Typography variant="subtitle1">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up">
              <span className="textSignUp">Sign up</span>
            </Link>
          </Typography>
        </div>
      </form>
    </AuthLayout>
  );
}
