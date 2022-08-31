import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
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
    container: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "0px 108px",
    },
    info: {
      width: "40%",
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
        fontWeight: 500,
        fontSize: 20,
        lineHeight: "20px",
        color: "#0A208F",
      },
      "& .content": {
        fontSize: 20,
        lineHeight: "26px",
        color: "#676767",
      },
    },
    lineChart: {
      width: "60%",
      display: "flex",
      alignItems: "center",
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
  };
});

export default useStyles;
