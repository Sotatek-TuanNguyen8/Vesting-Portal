import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    drawer: {
      position: "relative",
      "& .MuiPaper-root": {
        width: 285,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        padding: "0px 25px",
      },
      "& .MuiListItem-root": {
        borderTop: "1px solid #c2c2c2",
        fontSize: 18,
        lineHeight: "23px",
        color: "#051c42",
        padding: "12px 0px",
      },
      "& .MuiListItem-root:last-child": {
        borderBottom: "1px solid #c2c2c2",
      },
      "& .MuiSvgIcon-root": {
        width: 40,
        height: 40,
        marginRight: 18,
      },
    },
    iconClose: {
      marginTop: 30,
      marginRight: 10,
      display: "flex",
      justifyContent: "right",
      cursor: "pointer",
    },
    info: {
      display: "flex",
      justifyContent: "space-between",
      margin: "22px 0px",
      paddingRight: 35,
      "& .avatar": {
        borderRadius: "50%",
        width: 62,
        height: 62,
        backgroundColor: "#474747",
        marginRight: 30,
      },
      "& .boxInfo": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#303030",

        "& p": {
          margin: 0,
          fontSize: 26,
          lineHeight: "35px",
          marginBottom: 4,
        },
        "& span": {
          fontSize: 16,
          lineHeight: "22px",
        },
      },
    },
    active: {
      // fontWeight: "600 !important",
      color: "#051c42 !important",
      backgroundColor: "rgb(206 206 206 / 50%) !important",
    },
  };
});

export default useStyles;
