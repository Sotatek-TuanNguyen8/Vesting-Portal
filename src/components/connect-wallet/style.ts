import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      "& .MuiBox-root.boxConnect": {
        backgroundColor: theme.palette.primary.dark,
        borderRadius: "25px",
        minWidth: "546px",
        padding: "28px 45px",
        margin: "auto",
        minHeight: 530,
        "& .MuiTypography-h4": {
          fontSize: 24,
          lineHeight: "31px",
          fontFamily: "gibson",
          color: theme.palette.text.secondary,
          padding: 0,
        },
        "& span": {
          color: theme.palette.text.secondary,
          fontSize: 18,
          lineHeight: "23px",
          marginBottom: 12,
          marginTop: 46,
          display: "inline-block",
        },
      },
    },
    buttonWallet: {
      flexDirection: "row",
      justifyContent: "space-between !important",
      alignContent: "center",
      borderRadius: 10,
      maxWidth: 456,
      minHeight: 67,
      padding: "15px 27px !important",
      "& > .MuiTypography-body1": {
        fontSize: "18px",
        fontWeight: "600!important",
        color: theme.palette.text.secondary,
      },
    },
    box: {
      backgroundColor: theme.palette.background.default,
      borderRadius: 20,
      height: 67,
      "& .MuiButtonBase-root": {
        borderRadius: 20,
      },

      "& img": {
        marginBottom: "0 !important",
      },
      "& > .MuiTypography-body1": {
        fontWeight: "600 !important",
        fontSize: 18,
        lineHeight: "18px",
        color: "#050025",
      },
    },
    error: {
      fontFamily: "gibson",
      fontSize: 14,
      lineHeight: "18.2px",
      fontWeight: 400,
      marginLeft: 3,
    },
  };
});

export default useStyles;
