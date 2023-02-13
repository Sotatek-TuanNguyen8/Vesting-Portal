import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  return {
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "100px auto",
      "& .MuiButton-containedSizeSmall": {
        height: 62,
        borderRadius: 100,
        [mobile]: {
          height: 50,
        },
      },
    },
    inputForm: {
      marginBottom: 33.5,
      width: 440,
      position: "relative",
      [mobile]: {
        width: "100%",
      },
      "& .MuiInputLabel-root": {
        fontWeight: 300,
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
          margin: 0,
          marginLeft: 20,
          fontSize: 16,
          lineHeight: "20px",
          color: theme.palette.text.secondary,
          [mobile]: {
            marginLeft: 10,
            fontSize: 14,
            lineHeight: "18PX",
          },
        },
        "& input": {
          cursor: "pointer",
        },
      },
      "& .forgot": {
        fontSize: 16,
        lineHeight: "21px",
        color: theme.palette.text.secondary,
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
      marginTop: "219px",
      marginBottom: "40px",
      borderRadius: 10,
      width: 230,
      height: 50,
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.main,
      border: "none",
      fontSize: 16,
      cursor: "pointer",
      [mobile]: {
        marginTop: "193px",
        marginBottom: "32px",
      },
    },
    footer: {
      display: "inline-block",
      "& .MuiTypography-subtitle1": {
        fontWeight: 300,
        color: theme.palette.text.secondary,
      },
      "& .textSignUp": {
        color: theme.palette.secondary.light,
        cursor: "pointer",
      },
    },
  };
});

export default useStyles;
