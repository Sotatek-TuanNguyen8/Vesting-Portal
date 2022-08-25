import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    select: {
      padding: "0px 16px",
      width: 260,
      boxShadow: "1px 1px 2px 1px rgba(0, 0, 0, 0.25)",
      // position: "absolute",
    },
    action: {
      padding: "8px 0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& .btn": {
        width: 80,
        height: 26,
        background: "#FFFFFF",
        border: "1px solid #051C42",
        borderRadius: 4,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: " 20px",
        cursor: "pointer",
      },
      "& .btnCancel": {
        color: "#051C42",
        marginRight: 12,
      },
      "& .btnApply": {
        color: "#FFF",
        background: "#3FBCE9",
        border: "transparent",
      },
      "& .btnApply:disabled": {
        color: "#FFF",
        background: "#BBBBBB",
        border: "transparent",
        cursor: "no-drop",
      },
    },
    item: {
      display: "flex",
      alignItems: "center",
      marginBottom: 8,
      cursor: "pointer",
      "& .MuiTypography-root": {
        color: "#051C42",
        fontSize: 16,
        fontFamily: "gibson",
      },
    },
    clearFilter: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      color: "#3FBCE9",
      fontSize: 16,
      padding: "7px 0px",
      cursor: "pointer",
    },
  };
});

export default useStyles;
