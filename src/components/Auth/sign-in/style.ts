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
    inputError: {
      position: "absolute",
      margin: 0,
      color: "red",
      fontWeight: 250,
      fontSize: 14,
      lineHeight: "14px",
      paddingTop: 7,
    },
    boxAction: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: 440,
      [mobile]: {
        width: "100%",
      },
      "& .remember ": {
        display: "flex",
        alignItems: "center",
        "& p": {
          marginLeft: 20,
          fontSize: 16,
          lineHeight: "20px",
          color: "#4d4f5c",
          [mobile]: {
            marginLeft: 10,
            fontSize: 14,
            lineHeight: "18PX",
          },
        },
      },
      "& .forgot": {
        fontSize: 16,
        lineHeight: "21px",
        color: "#949494",
        cursor: "pointer",
        [mobile]: {
          fontSize: 14,
          lineHeight: "18PX",
        },
      },
      "& .checkbox": {
        width: 26,
        height: 26,
        margin: 0,
        [mobile]: {
          width: 22,
          height: 22,
        },
        "& :checked": {
          backgroundColor: "#3fbce9",
        },
      },
    },
    btnLogin: {
      marginTop: "18px !important",
      marginBottom: "50px !important",
      [mobile]: {
        marginTop: "193px !important",
        marginBottom: "32px !important",
      },
    },
    footer: {
      display: "inline-block",
      "& .MuiTypography-subtitle1": {
        fontWeight: 300,
      },
      "& .textSignUp": {
        color: "#3fbce9",
        cursor: "pointer",
      },
    },
  };
});

export default useStyles;
