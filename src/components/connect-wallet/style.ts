import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      "& .MuiTypography-h4": {
        fontWeight: "600 !important",
        fontSize: 24,
        lineHeight: "24px",
        fontFamily: "gibson",
      },
    },
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
    box: {
      background:
        "linear-gradient(152.1deg, #FFFFFF -14.3%, #FFFFFF 139.6%, #FFFFFF 182.25%)",
      border: "1px solid #E9E9F0",
      borderRadius: 20,
      height: 67,
      "& .MuiButtonBase-root": {
        borderRadius: 20,
      },
      "& img": {
        marginBottom: "0 !important",
      },
      "& .MuiTypography-body1": {
        fontWeight: "600 !important",
        fontSize: 18,
        lineHeight: "18px",
        color: "#050025",
      },
    },
    error: {
      fontFamily: "gibson",
      fontSize: 14,
      lineHeight: "18.2px",
      fontWeight: 400,
      marginLeft: 3,
    },
  };
});

export default useStyles;
