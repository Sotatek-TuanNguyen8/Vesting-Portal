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
      "& .MuiBackdrop-root": {
        backgroundColor: "rgba(0,0,0,0.1)",
      },
      "& .MuiPaper-elevation24": {
        boxShadow: "none",
      },
      "& .MuiDialog-container": {
        height: "auto",
      },
      "& p": {
        color: "#051C42",
        fontSize: 16,
        fontWeight: 400,
        // margin: "auto",
        padding: "20px 0",
        borderBottom: "1px solid #BBBBBB",
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
    btnDelete: {
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
  };
});
export default useStyles;
