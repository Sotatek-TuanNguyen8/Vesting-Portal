import { makeStyles } from "@material-ui/core";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => {
  const custom3 = theme.breakpoints.down(1512);
  const custom4 = theme.breakpoints.down(1340);
  const custom5 = theme.breakpoints.down(1090);

  return {
    menu: {
      display: "flex",
      columnGap: 50,
      alignItems: "center",
      marginLeft: 99.4,
      [custom3]: {
        marginLeft: 40,
      },
      [custom4]: {
        columnGap: 30,
        marginLeft: 0,
      },
      [custom5]: {
        columnGap: 20,
      },
    },
    menuItem: {
      display: "flex",
      columnGap: 9.76,
      alignItems: "center",
      color: theme.palette.common.white,
      fontSize: 15,
      lineHeight: "15px",
      cursor: "pointer",
      [custom5]: {
        columnGap: 6,
      },
      "& svg": {
        fill: "black",
        width: 12.34,
        height: 6.17,
        fontSize: 12,
      },
    },
    active: {
      fontWeight: 600,
      color: theme.palette.action.active,
    },
  };
});

export default useStyles;
