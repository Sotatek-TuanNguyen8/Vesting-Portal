import { Button, Typography } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "..";
import { confirmEmailAuth } from "../../../service";
import useStyles from "./style";
type Props = {};

export default function EmailConfirmPage({}: Props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  const email = searchParams.get("email");

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isNotEmailVerified, setIsNotEmailVerified] = useState<boolean>(false);
  const [notUser, setNotUser] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParams = params.get("email");
    const codeParams = params.get("code");
    if (!emailParams || !codeParams) {
      navigate("/sign-in");
    }
  }, [navigate]);

  const confirmEmail = useCallback(async () => {
    if (!email && !code) return;
    const res = await confirmEmailAuth({
      email: email as string,
      code: code as string,
    });
    setNotUser(false);
    if (res?.error) {
      setIsVerified(false);
      if (res?.error.statusCode === 400) {
        setIsNotEmailVerified(true);
      } else if (res?.error.statusCode === 406) {
        setIsNotEmailVerified(false);
        return;
      } else {
        toast.error(res?.error.message);
        setNotUser(true);
      }
    } else {
      setIsVerified(true);
    }
  }, [code, email]);

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  return (
    <AuthLayout isTab={false}>
      {!notUser && isVerified ? (
        <div className={classes.container}>
          <Typography variant="h5">Thank you for registering</Typography>
          <p className={classes.content}>
            Congratulations, your account has been successfully created. Please
            login to continue.
          </p>
          <Link to="/sign-in">
            <Button>LOG IN</Button>
          </Link>
        </div>
      ) : (
        <>
          {isNotEmailVerified ? (
            <div className={classes.container}>
              <Typography variant="h5">
                Email has already been verified
              </Typography>
              <p className={classes.content}>
                The email address has already been verified successfully. Click
                the button below to login
              </p>
              <Link to="/sign-in">
                <Button>LOG IN</Button>
              </Link>
            </div>
          ) : (
            <div className={classes.container}>
              <Typography variant="h5">Confirmation Link Expired</Typography>
              <p className={classes.content}>
                The verification link has expired. To verify your email address,
                please find the latest verification email in your mailbox.
              </p>
            </div>
          )}
        </>
      )}
    </AuthLayout>
  );
}
