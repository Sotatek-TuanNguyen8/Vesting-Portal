import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const custom = theme.breakpoints.down(1360);
  const custom2 = theme.breakpoints.down(1700);
  const custom3 = theme.breakpoints.down(1512);
  const custom4 = theme.breakpoints.down(1340);
  const custom5 = theme.breakpoints.down(1090);

  return {
    header: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",

      "& svg:first-child": {
        [custom]: {
          width: 150,
        },
        [custom5]: {
          width: 80,
          margin: "0px 20px",
        },
      },
      [mobile]: {
        padding: "20px 0px",
      },
    },
    headerContent: {
      height: 50,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.common.white,
      margin: 0,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "18px",
      fontSize: 18,
    },
    logo: {
      [mobile]: {
        width: 127,
      },
    },
    nav: {
      display: "flex",
      alignItems: "center",
      height: 65,
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      padding: "0px 50px",
      [custom3]: {
        padding: "0px 20px",
      },
      [custom4]: {
        padding: "0px",
      },
      "& .item": {
        cursor: "pointer",
      },

      "& .active": {
        borderBottom: "2px solid #3fbce9",
        fontWeight: 600,
        color: "#051c42",
        paddingBottom: 2,
      },
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      [custom2]: {
        justifyContent: "flex-start",
        columnGap: "150px",
      },
      [custom3]: {
        justifyContent: "space-between",
        columnGap: "0px",
      },
    },
  };
});

export default useStyles;
