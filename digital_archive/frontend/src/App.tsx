// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen/LoginScreen';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import HomeScreen from './components/HomeScreen/HomeScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import AuthRedirect from './components/Auth/AuthRedirect';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';


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
              <Route path="/login" element={
                <AuthRedirect>
                  <LoginScreen />
                </AuthRedirect>
              } />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="*" element={<RegisterScreen />} />
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;