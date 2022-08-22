import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    buttonWallet: {
      flexDirection: "row",
      justifyContent: "space-between !important",
      alignContent: "center",
      borderRadius: 10,
      maxWidth: 456,
      minHeight: 67,
      background:
        "linear-gradient(152.1deg, #FFFFFF -14.3%, #FFFFFF 139.6%, #FFFFFF 182.25%)",
      border: "1px solid #E9E9F0",
      padding: "15px 27px !important",
    },
  };
});

export default useStyles;