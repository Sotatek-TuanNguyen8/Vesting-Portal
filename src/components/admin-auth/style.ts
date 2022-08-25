import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import urlImage from "../../assets/svgs/background/layout.png";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const tablet = theme.breakpoints.down("md");
  const xl = theme.breakpoints.down("xl");
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
      padding: " 27px 15px  !important",
    },
    main: {
      width: "100%",
      margin: "0px auto",
      padding: "150px 27px 15px 27px !important",
      backgroundImage: `url(${urlImage})`,
      backgroundSize: "cover",
      height: "100%",
      minHeight: "100vh",
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
