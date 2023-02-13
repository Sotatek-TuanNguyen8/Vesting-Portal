import { makeStyles } from "@material-ui/core";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => {
  const custom4 = theme.breakpoints.down(1340);

  return {
    navbarAction: {
      display: "flex",
      alignItems: "center",
      "& svg": {
        "&:last-child": {
          cursor: "pointer",
        },
      },
    },
    btnSetting: {
      backgroundColor: "transparent",
      border: "none",
      color: theme.palette.common.white,
      fontSize: 15,
      cursor: "pointer",
      lineHeight: "15px",
      [custom4]: {
        paddingRight: 20,
      },
    },
    btnLogin: {
      backgroundColor: "transparent",
      border: "none",
      color: theme.palette.common.white,
      fontSize: 15,
      cursor: "pointer",
      lineHeight: "15px",
    },
    btnRegister: {
      fontSize: 15,
      lineHeight: "15px",
      color: theme.palette.common.white,
      backgroundColor: theme.palette.secondary.main,
      width: 89,
      height: 26,
      borderRadius: 5,
      border: "none",
      cursor: "pointer",
      margin: "0px 26px 0px 20px",
    },
    navLang: {
      margin: "0px 25px 0px 29px",
      color: theme.palette.common.white,
      display: "flex",
      columnGap: 10.26,
      alignItems: "center",
      fontSize: 15,
      "& svg": {
        cursor: "pointer",
        filter:
          "invert(72%) sepia(39%) saturate(4622%) hue-rotate(164deg) brightness(104%) contrast(83%) !important",
      },
    },
  };
});

export default useStyles;
