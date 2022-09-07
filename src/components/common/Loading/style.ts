import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    modalLoading: {
      "& .MuiPaper-root": {
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: 0,
        backgroundColor: "transparent",
        [theme.breakpoints.down("xs")]: {
          margin: "10px",
        },
      },
      "& .modal-content": {
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
        width: "100%",
        height: "100%",
      },
      "& .modal-content__head .title": {
        margin: "0 auto",
        fontSize: "24px",
        fontWeight: 700,
      },
      "& .modal-content__body": {
        padding: "0",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        "& p": {
          fontSize: 20,
          margin: "4px 0px",
        },
        "& span": {
          fontSize: 16,
          color: "rgba(255, 255, 255, .5)",
        },
      },
    },
  };
});

export default useStyles;
