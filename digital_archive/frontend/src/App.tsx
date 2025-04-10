// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen/LoginScreen';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Router>
          <div className="App" style={{ minHeight: '100vh', background: '#121212' }}>
            <Routes>
              <Route path="/" element={<LoginScreen />} />
              <Route path="*" element={<LoginScreen />} />
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;