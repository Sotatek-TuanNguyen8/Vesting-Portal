import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");

  return {
    input: {
      border: "none",
      outline: "none",
      backgroundColor: "#fff",
      width: "16.66%",
    },
  };
});

export default useStyles;
