import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      display: "flex",
      alignItems: "stretch",
      flexDirection: "column",
    },
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
          justifyContent: "space-between",
          borderBottom: "1px solid #BBBBBB",
          alignItems: "center",
          "& div:first-child": {
            display: "flex",
            flexDirection: "row",
            height: 55,
            alignItems: "center",
            "& img": {
              cursor: "pointer",
              margin: "0 12px 0 45px",
            },
            "& p": {
              cursor: "pointer",
              fontSize: 18,
              fontWeight: 400,
            },
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
  };
});
export default useStyles;
