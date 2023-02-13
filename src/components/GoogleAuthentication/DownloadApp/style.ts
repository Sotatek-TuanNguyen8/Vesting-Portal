import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.between("xs", "sm");

  return {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      boxSizing: "border-box",
      height: "100%",
      "& > .MuiTypography-body1": {
        color: theme.palette.text.primary,
        fontSize: 18,
        lineHeight: "23px",
      },
      "& .MuiTypography-body2": {
        color: theme.palette.text.secondary,
        fontSize: 16,
        lineHeight: "21px",
      },
      "& .MuiTypography-caption": {
        color: theme.palette.text.primary,
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
      display: "flex",
      marginTop: theme.spacing(3),
    },
    buttonLink: {
      borderRadius: 6,
      border: `1px solid ${theme.palette.text.primary} !important`,
      width: 120,
      height: 120,
      padding: "0px !important",
      backgroundColor: "translate !important",
      "&:hover": {
        border: "1px solid #fff",
        backgroundColor: "transparent",
      },
      "&:first-child": {
        marginRight: theme.spacing(3),
      },
    },
    boxInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: theme.palette.common.white,
    },

    textInitial: {
      textTransform: "initial",
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
      marginBottom: theme.spacing(3),
    },
    textCenter: {
      textAlign: "center",
    },
    font16: {
      fontSize: 16,
    },
    font18: {
      fontSize: 18,
      textTransform: "uppercase",
      textAlign: "center",
      marginTop: theme.spacing(1),
    },
    backup: {
      fontSize: 20,
      textTransform: "uppercase",
      padding: theme.spacing(1.5),
      backgroundColor: "#282828",
      border: "1px solid #383C43",
      borderRadius: 3,
      lineHeight: "23.2px",
      [mobile]: {
        fontSize: 16,
      },
      margin: theme.spacing(3, 0),
    },
    buttonSetting: {
      padding: theme.spacing(1.375, 2),
    },
    stepper: {
      padding: 0,
    },
    loadingBtn: {
      whiteSpace: "pre",
    },
    margin4: {
      margin: theme.spacing(0.5, 0),
    },
    margin16: {
      marginBottom: theme.spacing(2),
    },
    btnNext: {
      marginTop: "42px !important",
      borderRadius: 10,
      width: 230,
      height: 50,
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.main,
      border: "none",
      fontSize: 16,
      cursor: "pointer",
    },
  };
});

export default useStyles;
