import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const custom = theme.breakpoints.down(1440);
  const lg = theme.breakpoints.down(1024);
  return {
    allocation: {
      width: "100%",
      padding: "19px 38px",
      background: "translate",
      marginTop: 60,
      "& .MuiTypography-h5": {
        color: theme.palette.text.secondary,
        fontWeight: 600,
        fontSize: 28,
        lineHeight: "32px",
      },
    },
    text: {
      marginTop: 24,
      marginBottom: 30,
      textDecoration: "underline",
      fontSize: 20,
      lineHeight: "26px",
      color: theme.palette.text.primary,
    },
    btnClaim: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      width: 120,
      height: 32,
      borderColor: theme.palette.secondary.light,
      backgroundColor: "transparent",
      color: theme.palette.secondary.light,
      fontSize: 16,
      cursor: "pointer",
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
        fontWeight: 600,
        fontSize: 20,
        lineHeight: "23px",
        color: theme.palette.text.secondary,
      },
      "& .content": {
        fontSize: 20,
        lineHeight: "26px",
        fontWeight: 400,
        color: theme.palette.text.secondary,
      },
    },
    lineChart: {
      width: "63%",
      display: "flex",
      alignItems: "center",
      maxHeight: "100%",
      [lg]: {
        width: "100%",
      },
      "& tspan": {
        color: theme.palette.text.disabled,
      },
      "& line": {
        stroke: theme.palette.text.disabled,
      },
      "& .labelY": {
        fontSize: 14,
        lineHeight: "12px",
        marginRight: -16,
        width: 40,
        fontWeight: 700,
        transform: "rotate(-90deg)",
        color: theme.palette.text.disabled,
      },
      "& .labelX": {
        fontWeight: 700,
        fontSize: 14,
        lineHeight: "18px",
        color: theme.palette.text.disabled,
        textAlign: "center",
        paddingBottom: 30,
      },
    },
    boxLineChart: {
      height: "100%",
      width: "100%",
      "& svg": {
        width: 960,
      },
    },
  };
});

export default useStyles;
