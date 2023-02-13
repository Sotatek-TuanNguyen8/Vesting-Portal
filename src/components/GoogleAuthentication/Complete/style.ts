import { Theme, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) => {
  return {
    complete: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& > svg": {
        margin: "0px 0px 23px",
      },
    },
    completeContent: {
      color: theme.palette.text.secondary,
      fontSize: 18,
      lineHeight: "23px",
      marginBottom: 98,
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
  };
});

export default useStyles;
