import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      width: 400,
      height: 150,
      backgroundColor: "#fff",
      margin: "auto",
      "& .MuiPaper-root": {
        width: 400,
        height: 150,
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        margin: "auto",
      },
      "& .MuiDialog-container": {
        height: "auto",
      },
    },
    textContent: {
      display: "flex",
      flexDirection: "row",
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
    btnConfirm: {
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
    msgErr: {
      padding: 0,
      margin: "4px 0 0 0",
      color: "#F44336",
    },
    content: {
      textAlign: "center",
      color: "#051C42",
      fontSize: 16,
      fontWeight: 400,
      // margin: "auto",
      margin: "15px 0",
      padding: 20,
      borderBottom: "1px solid #BBBBBB",
      "& p": {
        margin: "5px 0 ",
      },
    },
  };
});
export default useStyles;
