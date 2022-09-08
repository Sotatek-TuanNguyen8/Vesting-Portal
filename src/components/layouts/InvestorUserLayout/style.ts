import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import urlImage from "../../../assets/svgs/background/layout.png";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const custom = theme.breakpoints.down(1200);

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
      maxWidth: 1605,
      width: "100%",
      margin: "0px auto",
      paddingBottom: 256,
      [theme.breakpoints.down(1600)]: {
        padding: "0px 60px",
        paddingBottom: 200,
      },
      [custom]: {
        padding: "0px 20px",
      },
    },
  };
});

export default useStyles;
