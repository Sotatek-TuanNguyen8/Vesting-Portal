import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    footer: {
      height: 90,
      width: "100%",
      backgroundColor: "#0A208F",
      color: theme.palette.common.white,
      fontSize: 48,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default useStyles;
