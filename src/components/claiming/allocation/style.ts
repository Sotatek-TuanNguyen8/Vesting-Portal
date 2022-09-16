import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const custom = theme.breakpoints.down(1440);
  const lg = theme.breakpoints.down(1024);
  return {
    allocation: {
      width: "100%",
      padding: "19px 38px",
      background: " #FFFFFF",
      marginTop: 60,
    },
    text: {
      marginTop: 24,
      marginBottom: 30,
      textDecoration: "underline",
      color: "#3F3F3F",
      fontSize: 20,
      lineHeight: "26px",
    },
    btnClaim: {
      display: "flex",
      flexDirection: "row",
      "&> div": {
        marginLeft: 4,
      },
    },
    container: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "0px 108px",
      [custom]: {
        gap: "0px 20px",
      },
      [lg]: {
        flexDirection: "column",
        alignItems: "center",
        gap: "50px 20px",
      },
    },
    info: {
      width: "40%",
      [custom]: {
        width: "30%",
      },
      [lg]: {
        width: "100%",
      },
      "& .MuiButtonBase-root": {
        height: 62,
        width: 227,
        borderRadius: "999px",
        float: "right",
      },
      "& .MuiDivider-root": {
        margin: "16px 0px",
        display: "block",
        width: "100%",
        backgroundColor: "#CECECE",
        height: 2,
      },
    },
    tokenType: {
      display: "flex",
      alignItems: "center",
      marginBottom: 5,
      justifyContent: "space-between",
      "& .label": {
        fontWeight: 400,
        fontSize: 20,
        lineHeight: "26px",
        color: "#0A208F",
      },
      "& .content": {
        fontSize: 20,
        lineHeight: "26px",
        fontWeight: 400,
        color: "#676767",
      },
    },
    lineChart: {
      width: "60%",
      display: "flex",
      alignItems: "center",
      maxHeight: "100%",
      [lg]: {
        width: "100%",
      },
      "& .labelY": {
        fontWeight: 250,
        fontSize: 12,
        lineHeight: "12px",
        color: "#82828E",
      },
      "& .labelX": {
        fontWeight: 250,
        fontSize: 12,
        lineHeight: "12px",
        color: "#82828E",
        textAlign: "center",
        paddingBottom: 30,
      },
    },
    boxLineChart: {
      height: "100%",
      width: "100%",
    },
  };
});

export default useStyles;
