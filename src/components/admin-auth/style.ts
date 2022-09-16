import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import urlImage from "../../assets/svgs/background/layout2.png";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const tablet = theme.breakpoints.down("md");
  const xl = theme.breakpoints.down("xl");
  return {
    logo: {
      margin: "20px 80px",
      width: 200,
      height: 59,
    },
    title: {
      padding: "0 0 50px 0",
      margin: 0,
      fontFamily: ["gibson", "sans-serif"].join(","),
      fontSize: "24px",
      color: "#0A208F",
      fontWeight: 600,
    },
    container: {
      borderRadius: 10,
      border: "1px solid #E9E9F0 !important",
      overflow: "hidden",
    },
    active: {
      display: "flex",
      gap: 8,
      opacity: 1,
      "&p": {
        fontFamily: "gibson",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "18.2px",
      },
    },
    unActive: {
      display: "flex",
      gap: 8,
      opacity: 0,
    },
    titleError: {
      color: "#F44336",
      fontSize: 14,
    },
    Wallet: {
      display: "flex !important",
      flexDirection: "row",
      justifyContent: "space-between !important",
      alignContent: "center",
      borderRadius: 10,
      width: "100%",
      maxWidth: 456,
      minHeight: 67,
      background:
        "linear-gradient(152.1deg, #FFFFFF -14.3%, #FFFFFF 139.6%, #FFFFFF 182.25%)",
      padding: " 0 27px 0px 19px  !important",
      marginTop: "82px !importain",
    },
    metaMaskIcon: {
      margin: "10px 0",
    },
    main: {
      width: "100%",
      margin: "0px auto",
      padding: "0px 50px 27px 0 !important",
      backgroundImage: `url(${urlImage})`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      height: "90%",
      minHeight: "90vh",
      backgroundRepeat: "no-repeat",
      [mobile]: {
        minHeight: 1040,
      },
    },
    box: {
      maxWidth: 1605,
      width: "100%",
      margin: "0px auto",
      paddingBottom: 256,
      [xl]: {
        padding: "0px 60px",
        paddingBottom: 200,
      },
      [tablet]: {
        padding: "0px 20px",
      },
    },
  };
});

export default useStyles;
