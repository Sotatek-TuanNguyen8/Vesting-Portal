import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
    },
    tableHeader: {
      marginTop: 25,
      display: "flex",
      flexDirection: "column",
      padding: "0 24px",
      "& div:first-child": {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-around",
        "& p": {
          width: "20%",
          fontSize: 16,
          fontWeight: 400,
          "& img": {
            marginLeft: 20,
          },
        },
        "& p:first-child": {
          paddingLeft: 20,
        },
        "& p:last-child": {
          paddingTight: 20,
        },
      },
      "& div:last-child": {
        // width: "100%",
        height: 0.8,
        padding: "0 24px",
        backgroundColor: "#BBBBBB",
      },
    },
    tableBody: {
      marginTop: 25,
      display: "flex",
      flexDirection: "column",
      padding: "0 24px",
      "& div:first-child": {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-around",
        "& p": {
          width: "16.66%",
          fontSize: 16,
          fontWeight: 400,
          color: " #0A208F",
          "& img": {
            marginLeft: 20,
          },
        },
        "& p:first-child": {
          paddingLeft: 20,
        },
        "& p:last-child": {
          paddingRight: 20,
          display: "flex",
        },
      },
      "& div:last-child": {
        // width: "100%",
        height: 0.8,
        padding: "0 24px",
        backgroundColor: "#BBBBBB",
      },
    },
  };
});
export default useStyles;
