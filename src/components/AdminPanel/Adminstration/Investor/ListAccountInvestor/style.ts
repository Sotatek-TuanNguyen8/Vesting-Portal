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
      "& .header": {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "space-around",
        "& p": {
          width: "12.5%",
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
          paddingTight: 20,
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
        "& .tokensClaimed": {
          width: "12.5%",
          display: "flex",
          alignItems: "center",
          color: "#0A208F",
        },
        "& .tokensVested": {
          width: "12.5%",
          display: "flex",
          color: "#0A208F",
          alignItems: "center",
        },
        "& .action": {
          width: "12.5%",
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
  };
});
export default useStyles;
