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
      background: "#ffffff",
      filter: "drop-shadow(6px 6px 15px rgba(0, 0, 0, 0.161))",
      margin: "0px auto",
      padding: "24px 0px",
      borderRadius: 10,
    },
    title: {
      paddingBottom: 16,
      borderBottom: "2px solid #e9e9f0",
      fontWeight: 600,
      color: "#0a208f",
      padding: "0px 28px 16px",
    },
    inputForm: {
      borderBottom: "2px solid #e9e9f0",
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
        color: "#051c42",
      },
      "& .MuiInputBase-root": {
        border: "2px solid #707070",
        borderRadius: 10,
        marginBottom: 52,
      },
      "& .MuiInputBase-input": {
        fontSize: 20,
        lineHeight: "26px",
        color: "#051c42",
        padding: "12px 18px",
        borderRadius: 10,
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
      color: "#051c42",
      padding: "76px 100px 57px",
      borderBottom: "2px solid #e9e9f0",
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
        color: "#051c42",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: " #E9E9F0",
        borderRadius: 10,
      },
      "& .btnContinue": {
        background: "#3fbce9",
        color: "#fff",
      },
      "& .btnContinue:disabled": {
        background: "#e9e9f0",
        color: "#bbbbbb",
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
      background: "#3fbce9",
      borderRadius: 10,
      border: "none",
      color: "#fff",
      fontWeight: 600,
      fontSize: 18,
      lineHeight: "18px",
      cursor: "pointer",
    },
  };
});

export default useStyles;
