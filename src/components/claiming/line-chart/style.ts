import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    customTooltip: {
      maxWidth: "250px",
      position: "relative",
      padding: "6px 41px",
      borderRadius: "20px",
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
      paddingTop: 10,
      lineHeight: "20px",
      fontWeight: 700,
    },
    labelTooltip: {
      fontWeight: 300,
      fontSize: 14,
      margin: "0",
    },
  };
});

export default useStyles;
