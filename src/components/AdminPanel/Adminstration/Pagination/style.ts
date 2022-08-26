import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    pagination: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 66,
      marginBottom: 66,
      "& .MuiButtonBase-root": {
        width: 25,
        hight: 25,
        borderRadius: "5px",
        background: "#E9E9F0",
        borderColor: "transparent",
        color: "#051C42",
        fontSize: 12,
      },
      "& .Mui-selected": {
        background: "#3FBCE9 !important",
        color: "#fff",
      },
    },
  };
});
export default useStyles;
