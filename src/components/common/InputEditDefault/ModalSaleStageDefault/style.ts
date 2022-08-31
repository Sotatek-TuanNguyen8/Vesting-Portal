import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      width: "80%",
      backgroundColor: "#fff",
      border: "1px solid #BBBBBB",
      borderRadius: 3,
      padding: "3px 10px",
      height: "auto",
      fontFamily: "gibson",
      "& .MuiInputBase-root.Mui-disabled": {
        height: "100%",
      },
      "& .MuiInput-underline.Mui-disabled:before": {
        display: "none",
      },
      "& .MuiInput-underline:before": {
        border: "none",
        display: "none",
      },
      "& .MuiInput-underline:after": {
        display: "none",
      },

      "& .MuiPaper-root .MuiMenu-paper .MuiPopover-paper .MuiPaper-elevation8 .MuiPaper-rounded":
        {
          height: "100%",
          minWidth: "214px !important",
          top: "372px !important",
          left: "890px !important",
        },
      "& div": {
        color: "#0A208F",
        fontSize: 16,
        fontWeight: 400,
        cursor: "pointer",
      },
    },
    wrapperEdit: {
      width: "80%",
      borderRadius: 3,
      "& .MuiInputBase-root.Mui-disabled": {
        height: "100%",
      },
      "& .MuiSelect-icon": {
        display: "none",
      },
      "& .MuiInput-underline.Mui-disabled:before": {
        display: "none",
      },
      "& div": {
        color: "#0A208F",
        fontSize: 16,
        fontWeight: 400,
        cursor: "pointer",
      },
    },
    wrap: {
      width: "14.2%",
      display: "flex",
      alignItems: "center",
    },
  };
});
export default useStyles;