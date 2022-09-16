import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import urlImage from "../../assets/svgs/background/auth.png";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const tablet = theme.breakpoints.down("md");
  return {
    container: {
      backgroundImage: `url(${urlImage})`,

      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      height: "100%",
      minHeight: "100vh",
      backgroundRepeat: "no-repeat",
      // backgroundPosition: "100px 50%",
      [tablet]: {
        backgroundImage: "none",
      },
    },
    boxContainer: {
      width: 740,
      padding: "40px 80px",
      background: "rgba(255, 255, 255, .7)",
      height: "100%",
      minHeight: "100vh",
      [tablet]: {
        width: "auto",
        padding: 0,
      },
    },

    logo: {
      "& .MuiTypography-body1": {
        color: "#36bbeb",
        marginTop: 16,
      },

      [tablet]: {
        backgroundImage: `url(${urlImage})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        height: 250,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundPosition: "center",
        "& img": {
          width: 310,
        },
        "& p": {
          fontWeight: 600,
        },
      },
      [mobile]: {
        "& img": {
          width: 210,
        },
        "& p": {
          fontWeight: 600,
          fontSize: 14,
        },
      },
    },

    content: {
      [tablet]: {
        padding: "42px 41px 36px",
        width: "100%",
      },
      [mobile]: {
        padding: "22px 41px 36px",
        width: "100%",
      },
      "& .box": {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        "& .tab": {
          display: "flex",
          alignItems: "center",
          marginBottom: 70,
          marginTop: 140,
          [tablet]: {
            marginBottom: 50,
            marginTop: 20,
          },
          [mobile]: {
            width: "100%",
            marginBottom: 30,
            marginTop: 0,
          },

          "& .btnTab": {
            width: 180,
            border: "1px solid #051c42",
            textAlign: "center",
            padding: "20px 0px",
            fontWeight: 400,
            fontSize: 18,
            cursor: "pointer",
            color: "#051c42",
            [mobile]: {
              width: "50%",
              padding: "15px 0px",
            },
          },
          "& .btnTab:first-child": {
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          },

          "& .btnTab:last-child": {
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
          },
        },
        "& .activeTab": {
          background: "#050025",
          color: "#ffffff !important",
          fontWeight: "600 !important",
          height: 66,
          lineHeight: "26px",
        },
      },
    },
  };
});

export default useStyles;
