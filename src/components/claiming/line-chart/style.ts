import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    customTooltip: {
      minWidth: 140,
      position: "relative",
      padding: "10px 12px",
      borderRadius: "25px",
      background: " linear-gradient(92.15deg, #E7D4FF 0.76%, #ABFBFD 100.94%)",
      color: "#474747",
      border: "none",
      fontWeight: 400,
      fontFamily: "gibson",
      textAlign: "center",
      "&:after": {
        content: '""',
        position: "absolute",
        height: 0,
        width: 0,
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        borderStyle: "solid",
        borderWidth: "10px 20px 0 0px",
        borderColor: " #ABFBFD transparent transparent transparent",
      },
    },
    valueTooltip: {
      margin: "0",
      fontSize: 27,
      paddingTop: 15,
      paddingBottom: 15,
      lineHeight: "20px",
    },
    labelTooltip: {
      fontSize: 14,
      margin: "0",
    },
  };
});

export default useStyles;
