import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      width: "16.67%",
    },
    input: {
      height: 40,
      border: "1px solid #BBBBBB",
      borderRadius: 5,
      padding: "0 10px",
      color: "#0A208F",
      backgroundColor: "#fff",
      width: "80%",
      fontSize: 16,
      fontWeight: 400,
    },
    hiddenInput: {
      height: 40,
      color: "#0A208F",
      borderRadius: 5,
      border: "none",
      outline: "none",
      backgroundColor: "#fff",
      width: "100%",
      fontSize: 16,
      fontWeight: 400,
    },
    inputFullname: {
      height: 40,
      border: "1px solid #BBBBBB",
      borderRadius: 5,
      padding: "0 20px",
      color: "#0A208F",
      backgroundColor: "#fff",
      width: "80%",
      fontSize: 16,
      fontWeight: 400,
    },
    hiddenInputFullname: {
      height: 40,
      color: "#0A208F",
      borderRadius: 5,
      border: "none",
      outline: "none",
      backgroundColor: "#fff",
      width: "100%",
      fontSize: 16,
      fontWeight: 400,
      paddingLeft: 20,
    },
    saleStage: {
      height: 40,
      border: "1px solid #BBBBBB",
      borderRadius: 5,
      padding: "0 10px",
      color: "#0A208F",
      backgroundColor: "#fff",
      width: "80%",
      fontSize: 16,
      fontWeight: 400,
      display: "flex",
      alignItems: " center",
      justifyContent: "space-between",
      position: "relative",
      "& img": {
        cursor: "pointer",
      },
      "& .modalSaleStage": {
        position: "absolute",
        top: "112%",
        left: "0",
        right: "0",
      },
    },
    hiddenSaleStage: {
      display: "flex",
      alignItems: " center",
      justifyContent: "space-between",
      height: 40,
      color: "#0A208F",
      borderRadius: 5,
      border: "none",
      outline: "none",
      backgroundColor: "#fff",
      width: "100%",
      fontSize: 16,
      fontWeight: 400,
    },
  };
});

export default useStyles;
