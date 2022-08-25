import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      width: 260,
      backgroundColor: "#fff",
      border: "1px solid #BBBBBB",
      boxShadow: "1px 1px 2px 1px rgba(0, 0, 0, 0.25)",
      borderRadius: 3,
      zIndex: 10,
      "& .btn": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: " 1px solid #BBBBBB",
        padding: "10px 12px",
        "& .btnCancel": {
          background: "#FFFFFF",
          border: "1px solid #051C42",
          borderRadius: 4,
          height: 26,
          width: 80,
          color: "#051C42",
          fontSize: 14,
          fontWeight: 600,
          marginRight: 12,
          cursor: "pointer",
        },
        "& .btnApply": {
          background: "#BBBBBB",
          border: "none",
          borderRadius: 4,
          height: 26,
          width: 80,
          color: "#FFF",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        },
        "& .btnIsApply": {
          background: "#3FBCE9",
          border: "none",
          borderRadius: 4,
          height: 26,
          width: 80,
          color: "#051C42",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        },
      },
      "& .item": {
        color: "#0A208F",
        fontSize: 16,
        fontWeight: 400,
        padding: "12px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        "& :hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        "& .imgApply": {
          marginRight: 20,
        },
        "& .hiddenIcon": {
          marginRight: 20,
          opacity: 0,
        },
      },
    },
  };
});
export default useStyles;
