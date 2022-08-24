import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    header: {
      backgroundColor: " #3FBCE9",
      height: 86,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "0 58px",
      alignItems: "center",
      "& .logo": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& .fluid": {
          fontSize: 36,
          fontWeight: 600,
          color: "#0A208F",
        },
        "& .seperate": {
          width: 2,
          height: 40,
          backgroundColor: "#0A208F",
          marginLeft: 32,
          marginRight: 35,
        },
        "& .admin": {
          fontSize: 26,
          fontWeight: 400,
          color: "#0A208F",
        },
      },
      "& .profile": {
        display: "flex",
        flexDirection: "row",
        "& .account": {
          marginLeft: 12,
        },
        "& .dropdown": {
          marginLeft: 60,
        },
      },
    },
  };
});
export default useStyles;
