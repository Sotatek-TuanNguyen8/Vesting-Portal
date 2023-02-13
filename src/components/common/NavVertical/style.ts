import { makeStyles } from "@material-ui/core";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => {
  return {
    box: {
      paddingTop: 20,
      minHeight: 1080,
    },
    boxCustom: {
      paddingTop: 0,
      minHeight: 1080,
    },
    container: {
      width: 80,
      backgroundColor: theme.palette.background.default,
      boxShadow: "10px 0px 20px rgba(217, 229, 255, 0.1)",
      height: "100%",
      minHeight: 1080,
    },
    containerCustom: {
      width: 80,
      backgroundColor: "transparent",
      height: "100%",
      minHeight: 1080,
    },
    menu: {
      display: "flex",
      flexDirection: "column",
      rowGap: 50,
      alignItems: "center",
      padding: "26px 0px",
    },
    menuItem: {
      display: "flex",
      rowGap: 6,
      flexDirection: "column",
      alignItems: "center",
      color: theme.palette.text.primary,
      textAlign: "center",
      fontSize: 11,
      lineHeight: "13px",
      width: 60,
      cursor: "pointer",
    },
    active: {
      fontWeight: 600,
      color: theme.palette.action.active,
    },
    info: {
      marginTop: 400,
    },
    circleAvatar: {
      width: 24,
      height: 24,
      borderRadius: 999,
      backgroundColor: theme.palette.info.main,
    },
    imgAvatar: {
      width: 24,
      height: 24,
      borderRadius: 999,
    },
  };
});

export default useStyles;
