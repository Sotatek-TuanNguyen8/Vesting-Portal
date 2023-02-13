import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      boxSizing: "border-box",
      "& > .MuiTypography-body1": {
        color: theme.palette.text.secondary,
        fontSize: 18,
        lineHeight: "23px",
      },
    },
    label: {
      fontWeight: "bold",
      fill: "#FFFFFF",
    },
    active: {
      "& .MuiStepIcon-text": {
        fill: "#151515",
      },
    },
    completed: {
      "& .MuiStepIcon-text": {
        fill: "#151515",
      },
    },
    boxLink: {
      marginTop: 16,
      width: 150,
      height: 150,
      backgroundColor: theme.palette.common.white,
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonLink: {
      borderRadius: 6,
      border: "1px solid #151515",
      width: 120,
      height: 120,
      padding: 0,
      "&:hover": {
        border: "1px solid #202020",
        backgroundColor: "transparent",
      },
    },
    textGrey: {
      color: "#999999",
    },
    footer: {
      maxWidth: 400,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
    },
    buttonBack: {
      border: "1px solid #999999",
      color: "#999999",
      width: 196,
      "&:hover": {
        border: "1px solid #202020",
        backgroundColor: "transparent",
      },
      marginRight: theme.spacing(1),
    },
    qrcode: {
      backgroundColor: theme.palette.common.white,
      borderRadius: 3,
      padding: theme.spacing(1),
    },
    font16: {
      fontSize: 16,
      textAlign: "center",
    },
    font18: {
      fontSize: 18,
      textTransform: "uppercase",
      textAlign: "center",
      marginTop: theme.spacing(1),
    },
    backup: {
      fontSize: 16,
      textTransform: "uppercase",
      padding: theme.spacing(1.5),
      backgroundColor: "#282828",
      border: "1px solid #383C43",
      borderRadius: 3,
      lineHeight: "23.2px",
      margin: theme.spacing(3, 0),
    },
    buttonSetting: {
      padding: theme.spacing(1.375, 2),
      flexGrow: 1,
    },
    snackbar: {
      top: 48,
    },
    snackbarContent: {
      backgroundColor: "#10A342",
      padding: theme.spacing(0.5, 1.5),
      minWidth: 400,
      "& .MuiSnackbarContent-action": {
        marginRight: 0,
      },
    },
    textWhite: {
      color: theme.palette.common.white,
    },
    svg: {
      "& path": {
        fill: theme.palette.common.white,
      },
    },
    enable: {
      "& > *": {
        flex: "1 1 50%",
      },
    },
    textCenter: {
      textAlign: "center",
    },
    margin16: {
      marginBottom: theme.spacing(2),
    },
    action: {
      marginTop: "28px !important",
      display: "flex",
      columnGap: 32,
      justifyContent: "center",
    },
    btnNext: {
      borderRadius: 10,
      width: 230,
      height: 50,
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.main,
      border: "none",
      fontSize: 16,
      cursor: "pointer",
    },
    btnBack: {
      borderRadius: 10,
      width: 230,
      height: 50,
      borderColor: theme.palette.secondary.light,
      backgroundColor: "transparent",
      color: theme.palette.secondary.light,
      fontSize: 16,
      cursor: "pointer",
    },
  };
});

export default useStyles;
