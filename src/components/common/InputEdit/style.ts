import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      width: "12.5%",
      display: "flex",
      flexDirection: "row",
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
      marginRight: 4,
      outline: "none",
    },
    inputError: {
      height: 40,
      border: "1px solid red",
      borderRadius: 5,
      padding: "0 10px",
      color: "#0A208F",
      backgroundColor: "#fff",
      width: "80%",
      fontSize: 16,
      fontWeight: 400,
      marginRight: 4,
      outline: "none",
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
      whiteSpace: "pre",
      overflow: "hidden",
      textOverflow: "ellipsis",
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
      outline: "none",
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
    inputFullnameError: {
      height: 40,
      border: "1px solid red",
      borderRadius: 5,
      padding: "0 20px",
      color: "#0A208F",
      backgroundColor: "#fff",
      width: "80%",
      fontSize: 16,
      fontWeight: 400,
      outline: "none",
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
        zIndex: 999,
        width: 260,
        backgroundColor: "#fff",
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
