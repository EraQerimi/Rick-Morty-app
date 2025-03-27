import React from "react";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import CharacterList from "./components/CharacterList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rickAndMortyLogo from "./assets/rick_and_morty_logo.png";

// Custom theme
const theme = createTheme({
  typography: {
    fontFamily: "'Bangers', cursive",
  },
});

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "#2c3e50",
          margin: 0,
          padding: 0,
        }}
      >
        {/* NAVBAR */}
        <AppBar position="static" sx={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
          <Toolbar>
            <Box
              component="img"
              src={rickAndMortyLogo}
              alt="Rick and Morty Logo"
              sx={{ height: 50, width: "auto", mr: 2 }}
            />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {t("title")}
            </Typography>
            <Button color="inherit" onClick={() => changeLanguage("en")}>
              English
            </Button>
            <Button color="inherit" onClick={() => changeLanguage("de")}>
              Deutsch
            </Button>
          </Toolbar>
        </AppBar>

        {/* MAIN CONTENT */}
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            borderRadius: 0,
            p: 3,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <CharacterList />
        </Container>

        {/* FOOTER */}
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "#fff",
            p: 2,
          }}
        >
          <Typography variant="body2">
            © 2025 Your Name. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
