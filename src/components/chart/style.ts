import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    customTooltip: {
      maxWidth: "250px",
      position: "relative",
      padding: "1px 11px",
      borderRadius: "5px",
      background: " linear-gradient(92.15deg, #E7D4FF 0.76%, #ABFBFD 100.94%)",
      color: "#474747",
      border: "none",
      fontWeight: 400,
      textAlign: "center",
      "&:after": {
        content: '""',
        position: "absolute",
        height: 0,
        width: 0,
        bottom: "-10px",
        left: "60%",
        transform: "translateX(-50%)",
        borderStyle: "solid",
        borderWidth: "10px 20px 0 0px",
        borderColor: " #ABFBFD transparent transparent transparent",
      },
    },
    valueTooltip: {
      margin: "0",
      fontSize: "27px",
    },
    labelTooltip: {
      fontWeight: 300,
      fontSize: "9px",
      margin: "5px 0",
    },
  };
});

export default useStyles;
