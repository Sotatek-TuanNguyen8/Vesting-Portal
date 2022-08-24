import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    body: {
      display: "flex",
      flexDirection: "column",
      width: 250,
      backgroundColor: "#E9E9F0",
      borderRight: "1px solid #BBBBBB",
      alignItems: "stretch",
      minHeight: "91vh",
      "& .investorActive": {
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "94%",
        backgroundColor: "#fff",
        // margin: "25px 0",
        marginTop: 25,
        "& span": {
          backgroundColor: "#3FBCE9",
          width: 4,
          height: 26,
          borderRadius: 2,
          marginLeft: 17,
          marginRight: 21,
        },
        "& img": {
          marginRight: 20,
        },
      },
      "& .investor": {
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "94%",
        marginTop: 25,
        "& img": {
          marginLeft: 42,
          marginRight: 20,
        },
      },
      "& .tokenomicsActive": {
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "94%",
        backgroundColor: "#fff",
        "& span": {
          backgroundColor: "#3FBCE9",
          width: 4,
          height: 26,
          borderRadius: 2,
          marginLeft: 17,
          marginRight: 21,
        },
        "& img": {
          marginRight: 20,
        },
      },
      "& .tokenomics": {
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "94%",

        "& img": {
          marginLeft: 42,
          marginRight: 20,
        },
      },
    },
    "& .content": {
      height: 634,
      width: "85%",
      backgroundColor: "#fff",
    },
  };
});
export default useStyles;
