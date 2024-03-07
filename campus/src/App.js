import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './Components/Header'
import WelcomeMessage from './Components/WelcomeMessage'
import RegistrationPage from "./Components/RegistrationPage";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './Components/LoginPage'

const App = () => {
  return (
    <div>
      <Router>
      <Header/>
      <Routes>
          <Route exact path="/" element = {<WelcomeMessage/>} />
          <Route exact path="/register" element={<RegistrationPage/>} />
          <Route exact path="/login" element={<LoginPage/>} />
      </Routes>
      </Router>
    </div>
  );
};

export default App;