import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      display: "flex !important",
      alignItems: "center",
    },
    avatar: {
      borderRadius: "50%",
      width: 62,
      height: 62,
      backgroundColor: "#474747",
      marginRight: 30,
    },
    dropMenu: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",

      "& .info": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#303030",
        marginRight: 80,
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
    menu: {
      "& .MuiPopover-paper": {
        width: 241,
        boxShadow: "4px 4px 10px rgba(170, 170, 170, 0.25)",
        borderRadius: 10,
        backgroundColor: "#fff",
      },
      "& .MuiList-padding": {
        padding: "10px 0px",
      },
      "& .MuiMenuItem-root": {
        padding: "10px 20px",
        color: "#474747",
        fontSize: 16,
        lineHeight: "16px",
      },
      "& .MuiMenuItem-root.Mui-focusVisible": {
        backgroundColor: "unset",
      },
      "& .MuiListItem-root:first-child ": {
        paddingTop: 10,
      },
      "& .MuiListItem-button:hover": {
        textDecoration: "none",
        backgroundColor: " rgba(0, 0, 0, 0.04) !important",
      },
      "& .MuiListItem-root:last-child": {
        paddingBottom: 10,
      },
      "& .MuiListItemIcon-root": {
        minWidth: "unset",
        marginRight: 12,
      },
    },
  };
});

export default useStyles;
