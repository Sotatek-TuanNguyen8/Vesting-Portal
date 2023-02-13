import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const tablet = theme.breakpoints.down("md");

  return {
    expired: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 630,
      maxHeight: 247,
      background: theme.palette.primary.dark,
      filter: "drop-shadow(6px 6px 15px rgba(0, 0, 0, 0.161))",
      margin: "0px auto",
      padding: "24px 0px",
      borderRadius: 8,
    },
    reset: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 630,
      minHeight: 350,
      background: theme.palette.primary.dark,
      filter: "drop-shadow(6px 6px 15px rgba(0, 0, 0, 0.161))",
      margin: "0px auto",
      padding: "24px 0px",
      borderRadius: 10,
    },
    title: {
      paddingBottom: 16,
      fontWeight: 600,
      color: theme.palette.text.secondary,
      padding: "0px 28px 16px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      padding: "31px 0px 0px 0px",
      "& .MuiButton-containedSizeSmall": {
        height: 62,
        borderRadius: 100,
        [mobile]: {
          height: 50,
        },
      },
    },
    inputForm: {
      marginBottom: 32,
      width: 440,
      position: "relative",
      marginLeft: 55,
      [mobile]: {
        width: "100%",
      },
      "& .MuiFormControl-root": {
        width: "100%",
      },
      "& .MuiFilledInput-root": {
        width: "100%",
        backgroundColor: "transparent",
        padding: 0,
      },
      "& .MuiFilledInput-input": {
        padding: "8px 0px",
      },
      "& .MuiInputBase-input": {
        padding: "3px 0px",
      },
      "& .MuiInputLabel-shrink": {
        transform: "translate(0, 1.5px) scale(0.75) !important",
      },
      "& .MuiInputLabel-formControl": {
        transform: "translate(0, 0) scale(1)",
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: theme.palette.secondary.light,
      },
      "& .MuiIconButton-label": {
        "& svg": {
          filter:
            "invert(83%) sepia(22%) saturate(497%) hue-rotate(195deg) brightness(104%) contrast(104%)",
        },
      },
    },
    inputErrorPass: {
      margin: 0,
      color: "red",
      fontWeight: 250,
      fontSize: 14,
      lineHeight: "14px",
      paddingTop: 7,
    },
    inputError: {
      position: "absolute",
      margin: 0,
      color: "red",
      fontWeight: 250,
      fontSize: 14,
      lineHeight: "14px",
      paddingTop: 7,
    },
    passwordLength: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      gap: 30,
      marginTop: 10,
      "& .weak,.normal,.strong,.default": {
        width: "100%",
        "& .line": {
          height: 6,
        },
        "& span": {
          fontSize: 14,
          lineHeight: "18px",
        },
      },

      "& .default": {
        "& .line": {
          background: "#bbbbbb",
        },
      },
      "& .weak": {
        "& .line": {
          background: "#e10a0a",
        },
      },
      "& .normal": {
        "& .line": {
          background: "#e18b0a",
        },
      },
      "& .strong": {
        "& .line": {
          background: "#0c9434",
        },
      },
    },
    action: {
      padding: "30px 32px 0px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      "& .btnContinue": {
        width: 110,
        height: 45,
        borderRadius: 10,
        border: "none",
        fontSize: 18,
        lineHeight: "18px",
        fontWeight: 600,
        cursor: "pointer",
        background: "#3fbce9",
        color: "#fff",
      },
      "& .btnContinue:disabled": {
        background: "#e9e9f0",
        color: "#bbbbbb",
        cursor: "no-drop",
      },
      "& .btnBack": {
        fontSize: 16,
        lineHeight: "21px",
        color: "#3fbce9",
        marginLeft: 55,
        cursor: "pointer",
      },
    },
    pwChange: {
      "& .content": {
        fontSize: 20,
        lineHeight: "26px",
        textAlign: "center",
        color: theme.palette.text.secondary,
        padding: "57px 100px",
        "& p ": {
          margin: 0,
          marginBottom: 30,
          fontSize: 24,
          lineHeight: "31px",
        },
      },
      "& .actionBack": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        "& .MuiButtonBase-root": {
          width: 146,
          height: 45,
          borderRadius: 10,
          border: "none",
          margin: "0px auto",
          fontWeight: 600,
          fontSize: 18,
          lineHeight: "18px",
          cursor: "pointer",
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.secondary.light,
        },
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& .MuiTypography-h5": {
        textAlign: "center",
        fontSize: 28,
        fontWeight: 400,
        lineHeight: "36px",
        paddingBottom: 50,
        paddingTop: 40,
        width: "100%",
        color: theme.palette.text.secondary,
      },
      [tablet]: {
        marginTop: 110,
      },

      [mobile]: {
        marginTop: 108,
        "& .MuiTypography-h5": {
          width: 175,
        },
      },
      "& .MuiButtonBase-root": {
        fontWeight: 600,
        width: 146,
        borderRadius: 10,
        padding: "16px 0px",
        height: 45,
        marginTop: 28,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.light,
      },
      "& .MuiButton-label ": {
        fontWeight: 600,
      },
    },
    content: {
      maxWidth: 446,
      textAlign: "center",
      fontSize: 18,
      margin: "32px 0px 32px 0px",
      [mobile]: {
        margin: "16px 0px 40px 0px",
      },
    },
  };
});

export default useStyles;
