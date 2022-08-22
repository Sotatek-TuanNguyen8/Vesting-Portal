import { Typography } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParams = params.get("email");
    const codeParams = params.get("code");
    if (!emailParams || !codeParams) {
      navigate("/login");
    }
  }, [navigate]);

  const confirmEmail = useCallback(async () => {
    if (!email && !code) return;
    const res = await confirmEmailAuth({
      email: email as string,
      code: code as string,
    });
    if (res?.error) {
      setIsVerified(false);
      if (res?.error.statusCode === 400) {
        setIsNotEmailVerified(true);
      } else {
        setIsNotEmailVerified(false);
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
      {isVerified ? (
        <div className={classes.container}>
          <Typography variant="h5">Thank you for registering</Typography>
          <p className={classes.content}>
            Congratulations, your account has been successfully created. Please
            login to continue.
          </p>
          <Link to="/sign-in" className={classes.btnLogin}>
            LOG IN
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
              <Link to="/sign-in" className={classes.btnLogin}>
                LOG IN
              </Link>
            </div>
          ) : (
            <div className={classes.container}>
              <Typography variant="h5">Confirmation Link Expired</Typography>
              <p className={classes.content}>
                The verification link has expired. To verify your email address,
                click the button below to resend confirmation email
              </p>
            </div>
          )}
        </>
      )}
    </AuthLayout>
  );
}
