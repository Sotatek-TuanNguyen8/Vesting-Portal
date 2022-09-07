import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "row",
      "& .listInvestor": {
        display: "flex",
        flexDirection: "column",
        flex: "1",
        "& .new": {
          display: "flex",
          flexDirection: "row",
          height: 55,
          cursor: "pointer",
          alignItems: "center",

          "& img": {
            margin: "0 12px 0 45px",
            cursor: "pointer",
          },
          "& p": {
            fontSize: 18,
            fontWeight: 400,
          },
        },
      },
    },
    body: {
      display: "flex",
      flexDirection: "column",
      marginTop: 25,
      "& .search": {
        marginLeft: 45,
        width: 315,
        border: "1px solid #BBBBBB",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& img": {
          padding: "12px 14px",
        },
        "& input": {
          height: "100%",
          width: "85%",
          border: "none",
          color: "black",
          outline: "none",
        },
      },
    },
    featureWrap: {
      display: "flex",
      width: "100%",
      borderBottom: "1px solid #BBBBBB",
      justifyContent: "space-between",
      alignItems: "center",
      "& .d-flex": {
        display: "flex",
      },
    },
    featureUPload: {
      display: "flex",
      alignItems: "center",
      marginLeft: "90px",
      cursor: "pointer",
      "& p": {
        marginLeft: "5px",
        fontWeight: 400,
        fontSize: "18px",
        color: "#051C42",
      },
    },
    startTime: {
      fontSize: "18px",
      fontWeight: 400,
      color: "#051C42",
      margin: "0 45px",
    },
    updateRoot: {
      margin: "10px 30px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },
  };
});
export default useStyles;
