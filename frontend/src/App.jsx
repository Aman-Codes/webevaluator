import React, { useState, useMemo } from "react";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { lightTheme, darkTheme } from "constants/theme";
import ColorModeContext from "shared/ColorModeContext";
import RoutesList from "RoutesList";

function App() {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createMuiTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1520,
            xl: 1920,
          },
        },
        typography: {
          fontSize: 12,
          fontFamily: ["Inter", "sand-serif"].join(","),
        },
        palette: {
          mode,
          ...(mode === "light" ? lightTheme : darkTheme),
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoutesList />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
