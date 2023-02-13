import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  return {
    forgot: {
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
    inputForm: {
      position: "relative",
      padding: "0px 28px",
      [mobile]: {
        width: "100%",
      },
      "& .MuiFormControl-root": {
        width: "100%",
      },
      "& .MuiInputLabel-root": {
        margin: "41px 0px 26px 0px",
        fontSize: 20,
        lineHeight: "26px",
        color: theme.palette.text.secondary,
      },
      "& .MuiInputBase-root": {
        border: `2px solid ${theme.palette.text.disabled}`,
        borderRadius: 10,
        marginBottom: 52,
      },
      "& .MuiInputBase-input": {
        fontSize: 20,
        lineHeight: "26px",
        padding: "12px 18px",
        borderRadius: 10,
        color: theme.palette.text.secondary,
      },
      "& .MuiInput-underline:after,.MuiInput-underline:before,.MuiInput-underline:before,.MuiInput-underline:hover:not(.Mui-disabled):before":
        {
          display: "none !important",
        },
    },
    inputError: {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      bottom: 16,
      "& p": {
        fontSize: 14,
        lineHeight: "18px",
        color: "#f44336",
        margin: 0,
        marginLeft: 12,
        fontWeight: 250,
      },
    },
    verification: {
      fontSize: 20,
      lineHeight: "26px",
      textAlign: "center",
      color: theme.palette.text.secondary,
      padding: "76px 60px 57px",
      "& span": {
        color: theme.palette.action.active,
      },
    },
    action: {
      padding: "21px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",

      "& .btnCancel,& .btnContinue": {
        width: 110,
        height: 45,
        borderRadius: 10,
        border: "none",
        fontSize: 18,
        lineHeight: "18px",
        fontWeight: 600,
        cursor: "pointer",
      },
      "& .btnCancel": {
        marginRight: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${theme.palette.secondary.light}`,
        backgroundColor: "transparent",
        color: theme.palette.secondary.light,
      },
      "& .btnContinue": {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.main,
      },
      "& .btnContinue:disabled": {
        background: theme.palette.text.disabled,
        color: theme.palette.common.white,
        cursor: "no-drop",
      },
    },
    actionOK: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      width: 349,
      margin: "0px auto",
      height: 45,
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.light,
      borderRadius: 10,
      border: "none",
      fontWeight: 600,
      fontSize: 18,
      lineHeight: "18px",
      cursor: "pointer",
    },
  };
});

export default useStyles;
