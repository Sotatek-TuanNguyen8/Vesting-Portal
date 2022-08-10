import { createTheme } from "@material-ui/core";

interface ThemeDesignColors {
  hover: {};
  border: {
    "1": React.CSSProperties["color"];
  };
}

const primary = {
  main: "#3FBCE9",
  dark: "#19ade3",
};

const common = {
  white: "#ffffff",
  black: "#000000",
};

declare module "@material-ui/core/styles" {
  interface Theme {
    custom: ThemeDesignColors;
  }
  interface ThemeOptions {
    custom: ThemeDesignColors;
  }
}

const custom: ThemeDesignColors = {
  hover: {},
  border: {
    "1": "rgba(5, 0, 37, 1)",
  },
};

export const theme = createTheme({
  custom,
  palette: {
    primary,
    common,
    secondary: {
      main: "#ffffff",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: ["Gibson", "sans-serif"].join(","),
    fontSize: 14,
    h6: {
      fontSize: "29px",
      lineHeight: "29px",
    },
    h5: {
      fontSize: "28px",
      lineHeight: "28px",
    },
    body1: {
      fontSize: "18px",
      lineHeight: "23.4px",
    },
    body2: {
      fontSize: "22px",
      lineHeight: "28.6px",
    },
    caption: {
      fontSize: "12px",
      lineHeight: "15px",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 768,
      lg: 1200,
      xl: 1440,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 24,
        textTransform: "none",
        paddingTop: 22,
        paddingBottom: 22,
      },
      label: {
        fontSize: 18,
      },
      contained: {
        "&.Mui-disabled": {
          // backgroundColor: "#FFD610",
          //   color: common.black,
          opacity: 0.3,
        },
        "&:hover.Mui-disabled": {
          backgroundColor: "#DCB910 !important",
        },
      },

      containedPrimary: {
        "&:hover": {
          backgroundColor: primary.dark,
        },
        color: common.white,
        fontWeight: 600,
      },
      outlinedPrimary: {
        "&:hover": {
          backgroundColor: "#000000",
        },
        backgroundColor: "transparent",
        color: common.black,
        border: `2px solid ${custom.border[1]}`,
        fontWeight: 600,
      },
      text: {
        "&:hover": {
          //   backgroundColor: hover.white,
        },
      },
      sizeSmall: {
        width: 227,
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      variant: "contained",
      color: "primary",
      size: "small",
    },
    MuiTypography: {
      variantMapping: {
        h5: "h1",
        h6: "h2",
        body1: "p",
        body2: "p",
      },
    },
  },
});