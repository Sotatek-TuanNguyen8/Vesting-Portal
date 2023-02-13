import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    box: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      margin: "0px auto",
    },
    header: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: "28px",
      marginBottom: 16,
      color: theme.palette.text.secondary,
      display: "block",
    },
    verify: {
      background: theme.palette.primary.dark,
      backdropFilter: "blur(5px)",
      padding: "24px 0px",
      borderRadius: 10,
      width: 879,
    },
    container: {
      textAlign: "center",
    },
    body: {
      margin: "70px 0px 0px",
    },
    progressContainer: {
      display: "flex",
      justifyContent: "space-between",
      position: "relative",
      margin: "0px auto",
      maxWidth: "100%",
      width: "82%",
    },
    progress: {
      backgroundColor: theme.palette.secondary.light,
      position: "absolute",
      top: "50%",
      left: 0,
      transform: "translateY(-50%)",
      height: 4,
      width: "0%",
      zIndex: -1,
      transition: "0.4s ease",
    },
    circle: {
      background: theme.palette.background.default,
      borderColor: theme.palette.background.default,
      borderRadius: "50%",
      height: 28,
      width: 28,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "3px solid #c4c1c1",
      transition: "0.4s ease",
      position: "relative",
      "&:not(:last-child):before": {
        content: "''",
        backgroundColor: theme.palette.text.disabled,
        position: "absolute",
        top: "50%",
        left: 32,
        transform: "translateY(-50%)",
        height: 2,
        width: 169,
        zIndex: -1,
      },
      "&:nth-child(3):before": {
        width: 186,
      },
      "&:nth-child(4):before": {
        width: 186,
      },
    },
    step: {
      position: "absolute",
      fontSize: "14px",
      color: theme.palette.text.secondary,
      fontWeight: 600,
      top: "50%",
      transform: "translate(0, -50%)",
      lineHeight: "14px",
    },
    check: {
      width: 12,
    },
    active: {
      borderColor: theme.palette.secondary.light,
      backgroundColor: theme.palette.secondary.light,
      scale: "1.1",
      "& div:first-child": {
        color: `${theme.palette.primary.main} !important`,
      },
      "& div:last-child": {
        color: `${theme.palette.secondary.light} !important`,
      },
      "&:nth-child(3):before": {
        width: 169,
      },
      "&:nth-child(4):before": {
        width: 169,
      },
    },
    icon: { position: "absolute", fontSize: "25px", bottom: "25px" },
    caption: {
      position: "absolute",
      fontSize: "16px",
      lineHeight: "21px",
      color: theme.palette.text.secondary,
      bottom: "-30px",
      width: "max-content",
    },
  };
});

export default useStyles;
