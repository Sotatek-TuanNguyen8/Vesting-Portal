import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const tablet = theme.breakpoints.down("md");
  const xl = theme.breakpoints.down("xl");
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 250,
      [xl]: {
        marginTop: 150,
        "& .MuiTypography-h5": {
          textAlign: "center",
        },
      },
      [tablet]: {
        marginTop: 110,
      },

      [mobile]: {
        marginTop: 108,
        "& .MuiTypography-h5": {
          width: 175,
        },
      },
      "& .MuiButtonBase-root": {
        fontWeight: 600,
        width: 161,
        borderRadius: 9999,
        padding: "16px 0px",
        height: 62,
      },
      "& .MuiButton-label ": {
        fontWeight: 600,
      },
    },
    content: {
      maxWidth: 446,
      textAlign: "center",
      fontSize: 18,
      margin: "32px 0px 32px 0px",
      [mobile]: {
        margin: "16px 0px 40px 0px",
      },
    },
  };
});

export default useStyles;
