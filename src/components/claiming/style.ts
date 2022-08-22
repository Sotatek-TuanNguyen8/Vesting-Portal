import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    claim: {
      width: "100%",
      maxWidth: 1440,
      margin: "0px auto",
      "& .MuiTypography-h5": {
        color: "#0A208F",
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
