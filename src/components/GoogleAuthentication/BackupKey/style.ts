import { makeStyles, Theme } from "@material-ui/core";

export const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#171F3F",
  backdropFilter: "blur(5px)",
  p: "21px 24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "5px",
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: theme.spacing(5, 0),
      width: "100%",
      boxSizing: "border-box",
      "& .MuiTypography-body1, .MuiTypography-body2": {
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
      display: "flex",
      margin: theme.spacing(3, 0),
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
      fontSize: 20,
      textTransform: "uppercase",
      padding: theme.spacing(1.5),
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.text.disabled}`,
      borderRadius: 8,
      lineHeight: "26px",
      color: "white !important",
      margin: "30px 0px 35px",
      minWidth: 325,
      height: 50,
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
      marginTop: "30px !important",
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
