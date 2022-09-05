import { Button, Typography } from "@material-ui/core";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "..";
import { resendEmailAuth } from "../../../service";
import useStyles from "./style";

export default function ResendEmailPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>();
  let [counter, setCounter] = useState<any>(-1);
  const [isEmailVerify, setIsEmailVerify] = useState<boolean>(false);
  const [isClickFirst, setIsClickFirst] = useState<boolean>(false);
  const userData = useSelector((s: any) => s.authAction.data);
  const { email, type } = useSelector((state: any) => state.resendEmail);

  useEffect(() => {
    if (userData?.isVerify) {
      navigate("/connect-wallet");
      return;
    }
    if (!userData?.verifyAt) {
      setCounter(60);
    } else {
      const time = Math.floor((Date.now() - userData?.verifyAt) / 1000);
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
    setIsClickFirst(true);
    setCounter(new Number(60));
    const res = await resendEmailAuth({ email: email as string });
    if (res?.data) {
      toast.success("Successfully! Please check email");
    } else {
      if (res?.error?.statusCode === 406) {
        setIsEmailVerify(true);
      } else {
        setIsEmailVerify(false);
        toast.error(res?.error?.details);
      }
    }
    setIsClickFirst(false);
  };

  return (
    <AuthLayout isTab={false}>
      {isEmailVerify ? (
        <div className={classes.container}>
          <Typography variant="h5">Email has already been verified</Typography>
          <p className={classes.content}>
            The email address has already been verified successfully. Click the
            button below to login.
          </p>
          <Link to="/sign-in">
            <Button>LOG IN</Button>
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
          <Button
            onClick={handleResendEmail}
            className={classes.btnResend}
            disabled={!countdown || Number(countdown || 0) > 0 || isClickFirst}
          >
            RESEND VERIFICATION
          </Button>
          <div className={classes.countdown}>
            {!countdown ||
              (Number(countdown || 0) > 0 &&
                `00:${("0" + countdown).slice(-2)}`)}
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
