import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      fontFamily: "gibson",
    },
    tableHeader: {
      marginTop: 25,
      display: "flex",
      flexDirection: "column",
      padding: "0 24px",
      "& .header": {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-around",
        "& p": {
          width: "13%",
          fontSize: 16,
          fontWeight: 400,
          "& img": {
            marginLeft: 20,
            cursor: "pointer",
          },
        },
        "& p:first-child": {
          paddingLeft: 20,
        },
        "& p:last-child": {
          paddingRight: 20,
        },
      },
      // "& div:last-child": {
      //   // width: "100%",
      //   height: 0.8,
      //   padding: "0 24px",
      //   backgroundColor: "#BBBBBB",
      // },
    },
    tableBody: {
      marginTop: 25,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 24px",
      "& .content": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& .tokensClaimed": {
          width: "13%",
          display: "flex",
          alignItems: "center",
          color: "#0A208F",
        },
        "& .tokensVested": {
          width: "13%",
          display: "flex",
          color: "#0A208F",
          alignItems: "center",
        },
        "& .action": {
          width: "9%",
          display: "flex",
          alignItems: "center",
          "& img": {
            cursor: "pointer",
            marginLeft: 20,
          },
        },
      },
    },
    border: {
      height: 0.8,
      padding: "0 24px",
      backgroundColor: "#BBBBBB",
      marginTop: 20,
    },
    saleStage: {
      position: "relative",
      width: "13%",
      fontSize: 16,
      fontWeight: 400,
      margin: "16px 0px",
      fontFamily: "gibson",
      "& img": {
        marginLeft: 20,
        cursor: "pointer",
      },
      "& .modalSaleStage": {
        position: "absolute",
        top: "112%",
        left: "0",
        right: "0",
        zIndex: 999,
        width: 260,
        backgroundColor: "#fff",
      },
    },
    noResult: {
      marginTop: 120,
      margin: "auto",
      color: "#909090",
      fontSize: 18,
      fontWeight: 400,
    },
  };
});
export default useStyles;