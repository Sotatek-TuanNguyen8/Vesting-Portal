import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      width: "12.5%",
      backgroundColor: "#fff",
      border: "1px solid #BBBBBB",
      borderRadius: 3,
      padding: "3px 10px",
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
          minWidth: "214px !important",
          top: "372px !important",
          left: "890px !important",
        },
      "& div": {
        // boxShadow: "1px 4px 4px rgba(0, 0, 0, 0.25)",
        color: "#0A208F",
        fontSize: 16,
        fontWeight: 400,
        // padding: "0px 16px",
        cursor: "pointer",
      },
    },
    wrapperEdit: {
      width: "12.5%",
      borderRadius: 3,
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
  };
});
export default useStyles;
