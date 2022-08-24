import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");

  return {
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "45px 0px",

      "& .MuiButtonBase-root": {
        padding: "22px 37px",
        color: "#fff",
        fontWeight: 600,
        fontSize: 18,
        lineHeight: "18px",
        backgroundColor: "#3fbce9",
        borderRadius: 52,
        width: 227,
      },
      "& > div:last-child": {
        display: "none",
      },
      [mobile]: {
        padding: "20px 0px",
      },
    },
    logo: {
      [mobile]: {
        width: 127,
      },
    },
    nav: {
      display: "flex",
      alignItems: "center",
      width: 543,
      justifyContent: "space-between",
      padding: "20px 33px 12px",
      backgroundColor: "#ffffff",
      fontSize: 18,
      lineHeight: "23px",
      color: "#051c42",
      borderRadius: 22,

      "& .item": {
        cursor: "pointer",
      },

      "& .active": {
        borderBottom: "2px solid #3fbce9",
        fontWeight: 600,
        color: "#051c42",
        paddingBottom: 8,
      },
    },
  };
});

export default useStyles;
