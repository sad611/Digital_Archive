// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
import { router } from "./router";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  // [AABACABAA D BABAACAABAB]

  // [BABAACAABAB]
  // string = 'AABAB'
  // [xCy]
  // aDbDc
  // a = x C y

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
