import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import urlImage from "../../../assets/svgs/background/layout.png";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const tablet = theme.breakpoints.down("md");
  const xl = theme.breakpoints.down("xl");

  return {
    main: {
      width: "100%",
      margin: "0px auto",
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
      maxWidth: 1626,
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
