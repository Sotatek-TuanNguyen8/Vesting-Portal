import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      position: "relative",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      marginLeft: "5px",

      "&> .onHoverTooltip": {
        position: "absolute",
        visibility: "hidden",
        color: "#051C42",
        opacity: 0,
        fontWeight: 400,
        fontSize: 14,
        width: 220,
        height: 44,
        backgroundColor: "#F44336",
        borderRadius: 10,

        top: "-110%",
        left: -8,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        transition: "all 200ms",
        zIndex: 3,
        // borderRadius: 10,
        "&> p": {
          padding: "0px 12px",
          margin: "5px 0",
        },
        " &::after": {
          content: '""',
          position: "absolute",
          display: "block",
          backgroundColor: "#F44336",
          left: 12,
          top: 44,
          width: 10,
          height: 10,
          clipPath: "polygon(50% 100%, 0 0, 100% 0)",
        },
      },
      "&:hover > .onHoverTooltip": {
        visibility: "visible",
        opacity: 1,
      },
    },
  };
});
export default useStyles;
