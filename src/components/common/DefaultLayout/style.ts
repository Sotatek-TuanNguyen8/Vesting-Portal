import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return {
    main: {
      backgroundColor: theme.palette.background.default,
      display: "flex",
    },
  };
});

export default useStyles;
