import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      width: 409,
      height: 223,
      backgroundColor: "#fff",
      margin: "auto",
      "& .MuiPaper-root": {
        width: 409,
        minHeight: 223,
        padding: "20px 0",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      },
      "& .MuiDialog-container": {
        height: "auto",
      },
    },
    title: {
      paddingBottom: 14,
      display: "flex",
      justifyContent: "flex-start",
      fontSize: 20,
      fontWeight: 600,
      color: "#051C42",
      width: "86%",
      borderBottom: "1px solid #BBBBBB",
    },
    textContent: {
      display: "flex",
      flexDirection: "column",
      width: "74%",
      "& p:first-child": {
        color: "#051C42",
        fontSize: 16,
        fontWeight: 400,
        margin: "10px 0",
      },
      "& .inputText": {
        width: "100%",
        height: 36,
        border: "1px solid #BBBBBB",
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        "& input": {
          width: "94%",
          height: "100%",
          outline: "none",
          border: "none",
        },
      },
      "& .error": {
        border: "1px solid red",
      },
      "& div:last-child": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 24,
      },
    },
    btnCancel: {
      width: 100,
      height: 32,
      backgroundColor: "#BBBBBB",
      borderRadius: 4,
      color: "#fff",
      fontWeight: 600,
      marginRight: 20,
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
    },
    btnCreate: {
      width: 100,
      height: 32,
      backgroundColor: "#3FBCE9",
      borderRadius: 4,
      color: "#051C42",
      padding: "6px 28px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 600,
    },

    btnCreateDisable: {
      width: 100,
      height: 32,
      backgroundColor: "#3FBCE9",
      borderRadius: 4,
      color: "#051C42",
      padding: "6px 28px",
      border: "none",
      // cursor: "pointer",
      opacity: 0.7,
      fontSize: "14px",
      fontWeight: 600,
    },
    msgErr: {
      padding: 0,
      margin: "4px 0 0 0",
      color: "#F44336",
    },
  };
});
export default useStyles;
