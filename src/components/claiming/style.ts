import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    claim: {
      width: "100%",
      maxWidth: 1340,
      margin: "0px auto",
      marginTop: 40,
      "& .MuiTypography-h5": {
        color: "#0A208F",
      },
      position: "relative",
      [theme.breakpoints.down(1600)]: {
        maxWidth: 1240,
      },
    },
    desc: {
      fontSize: 20,
      lineHeight: "26px",
      color: "#3F3F3F",
    },
  };
});

export default useStyles;
