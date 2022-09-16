import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import urlImage from "../../../assets/svgs/background/layout.png";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const xl = theme.breakpoints.down("xl");

  return {
    main: {
      width: "100%",
      margin: "0px auto",
      backgroundImage: `url(${urlImage})`,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      height: "100%",
      minHeight: "100vh",
      backgroundRepeat: "no-repeat",
      position: "relative",

      [mobile]: {
        minHeight: 1040,
      },
    },
    logo: {
      position: "absolute",
      left: 147,
      top: 45,
      [xl]: {
        left: 100,
        top: 30,
      },
    },
  };
});

export default useStyles;
