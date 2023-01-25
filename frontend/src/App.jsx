import { Routes, Route, Navigate } from "react-router-dom";
import HomePg from "./pages/homePg/HomePg";
import LoginPg from "./pages/loginPg/LoginPg";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={isAuth ? <HomePg/> : <LoginPg />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
