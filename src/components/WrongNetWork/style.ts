import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    wrong: {
      width: "100%",
      height: 42,
      backgroundColor: "#F2994A",
      fontFamily: "gibson",
      fontSize: 16,
      color: "#3F3F3F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      transform: "translate(0, -150%)",
      "& span": {
        textDecoration: "underline",
        marginLeft: 2,
        cursor: "pointer",
      },
    },
  };
});

export default useStyles;
