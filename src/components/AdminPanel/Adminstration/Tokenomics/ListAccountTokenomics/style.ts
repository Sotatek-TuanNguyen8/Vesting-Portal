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
          width: "20%",
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
        "& div:first-child": {
          paddingLeft: 20,
        },
        "& .action": {
          width: "16.67%",
          display: "flex",
          alignItems: "center",
          "& img": {
            cursor: "pointer",
            marginLeft: 20,
            width: "20px",
            "&:last-child": {
              width: "17.65px",
            },
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
    addWrap: {
      display: "flex",
      marginTop: 25,
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 24px",
    },
    content: {
      display: "flex",
      flexDirection: "row",
    },
    action: {
      width: "16.67%",
      display: "flex",
      alignItems: "center",
      "& img": {
        cursor: "pointer",
        marginLeft: 20,
      },
    },
  };
});
export default useStyles;
