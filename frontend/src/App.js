import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import DashPage from './pages/DashPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route exact path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/dash" element={<DashPage />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}


export default App;
