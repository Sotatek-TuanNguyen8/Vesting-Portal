import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      width: 227,
      backgroundColor: "#fff",
      border: "1px solid #BBBBBB",
      boxShadow: "1px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: 3,
      "& div": {
        color: "#0A208F",
        fontSize: 16,
        fontWeight: 400,
        padding: "11px 16px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      },
    },
  };
});
export default useStyles;
