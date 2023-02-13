import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    claim: {
      width: "100%",
      margin: "0px auto",
      marginTop: 40,
      backgroundColor: theme.palette.primary.main,
      boxShadow: "10px 0px 20px rgba(217, 229, 255, 0.1)",
      borderRadius: "8px",
      padding: "15px 24px",
      "& .MuiTypography-h5": {
        color: theme.palette.text.secondary,
        fontWeight: 700,
        fontSize: 24,
        lineHeight: "31px",
      },
      position: "relative",
      [theme.breakpoints.down(1600)]: {
        maxWidth: 1240,
      },
    },
    desc: {
      color: theme.palette.text.secondary,
      fontSize: 16,
      lineHeight: "21px",
    },
  };
});

export default useStyles;
