import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  const mobile = theme.breakpoints.down("sm");
  const tablet = theme.breakpoints.down("md");
  return {
    boxContainer: {
      margin: "0px auto",
      marginTop: 186,
      [tablet]: {
        width: "auto",
        padding: 0,
      },
    },

    content: {
      "& .box": {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 74,
        "& .tab": {
          display: "flex",
          alignItems: "center",
          [mobile]: {
            width: "100%",
            "& .activeTab": {
              height: 55,
            },
          },
          "& .btnTab": {
            width: 160,
            textAlign: "center",
            padding: "0px 0px 13px 0px",
            fontWeight: 400,
            fontSize: 16,
            cursor: "pointer",
            lineHeight: "21px",
            color: theme.palette.secondary.light,
            [mobile]: {
              width: "50%",
              padding: "15px 0px",
            },
          },
        },
        "& .activeTab": {
          fontWeight: "600 !important",
          lineHeight: "18px",
          borderBottom: `1px solid ${theme.palette.secondary.light}`,
        },
      },
    },
  };
});

export default useStyles;
