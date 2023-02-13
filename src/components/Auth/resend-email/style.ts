import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const xl = theme.breakpoints.down("xl");
  return {
    resendEmail: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginTop: 439,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [xl]: {
        "& .MuiTypography-h5": {
          textAlign: "center",
          color: theme.palette.text.primary,
        },
      },
      [mobile]: {
        "& .MuiTypography-h5": {
          width: 175,
        },
      },
      "& .MuiButtonBase-root": {
        fontWeight: 600,
        borderRadius: 9999,
        padding: "16px 0px",
        width: 227,
        height: 62,
      },
      "& .MuiButton-label ": {
        fontWeight: 600,
      },
    },
    content: {
      maxWidth: 393,
      textAlign: "center",
      fontSize: 18,
      margin: "32px 0px 32px 0px",
      color: theme.palette.text.primary,
      [mobile]: {
        margin: "16px 0px 40px 0px",
      },
    },
    btnResend: {
      marginTop: 7,
      borderRadius: 10,
      width: 230,
      height: 50,
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.main,
      border: "none",
      fontSize: 16,
    },
    countdown: {
      fontSize: 18,
      lineHeight: "23px",
      textAlign: "center",
      color: "#bbbbbb",
      marginTop: 10,
    },
  };
});

export default useStyles;
