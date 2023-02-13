import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  return {
    form: {
      display: "flex",
      flexDirection: "column",
      "& .MuiButton-containedSizeSmall": {
        height: 50,
        borderRadius: 100,
        [mobile]: {
          height: 42,
        },
      },
    },
    header: {
      color: theme.palette.text.secondary,
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "20px",
      margin: 0,
    },
    text: {
      color: theme.palette.text.secondary,
      fontSize: 16,
      lineHeight: "21px",
      display: "block",
      margin: "34px 0px 14px",
    },

    inputForm: {
      marginBottom: 32,
      width: 440,
      position: "relative",
      [mobile]: {
        width: "100%",
      },
      "& input": {
        width: 363,
        height: 35,
        background: "#030B33",
        border: `1px solid ${theme.palette.text.disabled}`,
        borderRadius: "3px",
        padding: "0px 13px",
        fontSize: 14,
        color: theme.palette.text.secondary,
        "&:focus": {
          border: `1px solid ${theme.palette.action.active}`,
        },
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
    btnVerify: {
      marginTop: "18px !important",
      borderRadius: "10px",
      width: 83,
      height: 27,
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.main,
      border: "none",
      fontSize: 15,
      cursor: "pointer",
      [mobile]: {
        marginTop: "193px !important",
      },
    },
  };
});

export default useStyles;
