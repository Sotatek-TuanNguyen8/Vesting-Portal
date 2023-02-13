import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  return {
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
    btnSingUp: {
      marginTop: "18px !important",
      marginBottom: "50px !important",
    },
    footer: {
      "& .MuiTypography-subtitle1": {
        fontWeight: 300,
        color: "#474747",
      },
      "& .textSignUp": {
        color: "#3fbce9",
        cursor: "pointer",
      },
    },
  };
});

export default useStyles;
