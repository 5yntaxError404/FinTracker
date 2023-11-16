import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import DashPage from './pages/DashPage';
import AccountsPage from './pages/AccountsPage';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';
import BudgetsPage from './pages/BudgetsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import PasswordRecoveryPage from './pages/PasswordRecoveryPage';
import EmailVerifiedPage from './pages/EmailVerifiedPage';

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route exact path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/dash" element={<DashPage />} />
                  <Route path="/accounts" element={<AccountsPage />} />
                  <Route path="/help" element={<HelpPage/>} />
                  <Route path="/settings" element={<SettingsPage/>} />
                  <Route path="/budgets" element={<BudgetsPage/>} />
                  <Route path="/passwordrecovery" element={<PasswordRecoveryPage/>} />
                  <Route path="/EmailVerification" element={<EmailVerificationPage/>} />
                  <Route path="/verify-email" />
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
