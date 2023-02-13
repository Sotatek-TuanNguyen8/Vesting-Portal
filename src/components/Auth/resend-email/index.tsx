import { Button, Typography } from "@material-ui/core";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resendEmailAuth } from "../../../service";
import { useAppSelector } from "../../../store/reducers";
import DefaultLayout from "../../common/DefaultLayout";
import Loading from "../../common/Loading";
import useStyles from "./style";

export default function ResendEmailPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>();
  let [counter, setCounter] = useState<any>(-1);
  const [isEmailVerify, setIsEmailVerify] = useState<boolean>(false);
  const userData = useAppSelector((s) => s.authReducer.data);
  const { email, type } = useAppSelector((state) => state.resendEmailReducer);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userData?.isVerify) {
      navigate("/connect-wallet");
      return;
    }
    if (!userData?.verifyAt) {
      setCounter(60);
    } else {
      const time = Math.floor((Date.now() - Number(userData?.verifyAt)) / 1000);
      if (time > 60) {
        setCounter(0);
      } else {
        setCounter(60 - time);
      }
    }
  }, [userData?.isVerify, navigate, userData?.verifyAt]);

  useLayoutEffect(() => {
    if (counter < 0) return;
    const interval = setInterval(function () {
      counter--;
      if (counter <= 0) {
        setCountdown(-1);
        return;
      } else {
        setCountdown(counter);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (!email) {
      navigate("/sign-in");
    }
  }, [navigate, email]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    // eslint-disable-next-line no-new-wrappers
    setCounter(new Number(60));
    const [res, error] = await resendEmailAuth({ email: email as string });
    if (res) {
      toast.success("Successfully! Please check email");
    } else {
      if (error.error.statusCode === 406) {
        setIsEmailVerify(true);
      } else {
        setIsEmailVerify(false);
        toast.error(res.error.details);
      }
    }
    setIsLoading(false);
  };

  return (
    <DefaultLayout>
      <div className={classes.resendEmail}>
        <Loading open={isLoading} />
        {isEmailVerify ? (
          <div className={classes.container}>
            <Typography variant="h5">
              Email has already been verified
            </Typography>
            <p className={classes.content}>
              The email address has already been verified successfully. Click
              the button below to login.
            </p>
            <Link to="/sign-in">
              <Button>Log In</Button>
            </Link>
          </div>
        ) : (
          <div className={classes.container}>
            <Typography variant="h5">
              {type === "sign-up"
                ? "Thank you for registering."
                : "Email has not been verified."}
            </Typography>
            <p className={classes.content}>
              An email has been sent to activate your account. Please click the
              link to activate your account.
            </p>
            <button
              onClick={handleResendEmail}
              className={classes.btnResend}
              disabled={!countdown || Number(countdown || 0) > 0 || isLoading}
            >
              Resend Verification
            </button>
            <div className={classes.countdown}>
              {!countdown ||
                (Number(countdown || 0) > 0 &&
                  `00:${("0" + countdown).slice(-2)}`)}
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
