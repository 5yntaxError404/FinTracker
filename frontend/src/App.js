import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route exact path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
              </Routes>
          </div>
      </BrowserRouter>
  );
}


/*
function App() {
    return (
        <div className="App">
            <LoginPage />
        </div>
    );
  }
  */

export default App;
