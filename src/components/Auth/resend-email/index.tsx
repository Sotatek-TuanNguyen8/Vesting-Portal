import { Button, Typography } from "@material-ui/core";
import React from "react";
import AuthLayout from "..";
import styles from "./styles.module.scss";
type Props = {};

export default function ResendEmailPage({}: Props) {
  return (
    <AuthLayout isTab={false}>
      <div className={styles.container}>
        <Typography variant="h5">
          {true
            ? "Thank you for registering."
            : "Your email is yet to be verified."}
        </Typography>
        <p className={styles.content}>
          An email has been sent to activate your account. Please click the link
          to activate your account.
        </p>
        <Button className={styles.btnResend}>Resend Verification</Button>
      </div>
    </AuthLayout>
  );
}
