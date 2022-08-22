import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const tablet = theme.breakpoints.down("md");
  const xl = theme.breakpoints.down("xl");

  return {
    container: {
      padding: "28px 46px 85px 46px",
      borderRadius: 12,
      backgroundColor: "#ffffff",
      opacity: 0.8,
      color: "#051c42",
      filter: "drop-shadow(0px 10px 6px rgba(0, 0, 0, 0.2))",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 1409,
      margin: "0px auto",
      marginTop: 156,
      [xl]: {
        padding: 26,
        width: "100%",
        marginTop: 156,
      },
      [tablet]: {
        marginTop: 56,
      },
      [mobile]: {
        padding: "26px 38px",
      },
    },
    title: {
      height: "fit-content",
      display: "flex",
      alignItems: "center",
      [tablet]: {
        "& img": {
          width: 170,
        },
      },
      [mobile]: {
        "& img": {
          width: 140,
        },
      },
      "& p": {
        margin: 0,
        fontWeight: 500,
        fontSize: 89,
        lineHeight: "89px",
        marginLeft: 54,
        [tablet]: {
          fontSize: 47,
          lineHeight: "47px",
          marginLeft: 20,
        },
        [mobile]: {
          fontSize: 39,
          lineHeight: "39px",
          marginLeft: 12,
        },
      },
    },

    coming: {
      fontWeight: 500,
      fontSize: 42,
      lineHeight: "42px",
      marginTop: 24,
      marginBottom: 0,
      [tablet]: {
        fontSize: 31,
        lineHeight: "31px",
      },
      [mobile]: {
        fontSize: 23,
        lineHeight: "23px",
      },
    },

    desc: {
      marginTop: 30,
      fontSize: 24,
      lineHeight: "24px",
      textAlign: "center",
      [tablet]: {
        fontWeight: 400,
        fontSize: 20,
        textAlign: "left",
        marginTop: 30,
      },
      [mobile]: {
        fontWeight: 300,
        fontSize: 18,
        textAlign: "left",
        marginTop: 25,
      },
      "& p": {
        marginTop: 30,
        fontWeight: 300,
      },
      "& p:first-child": {
        marginTop: 0,
      },

      "& span": {
        fontWeight: 500,
        color: "#051c42",
      },
    },
  };
});

export default useStyles;
