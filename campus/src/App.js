import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './Components/Header'
import WelcomeMessage from './Components/WelcomeMessage'
import RegistrationPage from "./Components/RegistrationPage";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './Components/LoginPage'
import MainPage from './Components/MainPage'
import ProfilePage from './Components/ProfilePage'
import CoursesPage from './Components/CoursesPage'
import DetailPage from './Components/DetailPage'

const App = () => {
  return (
    <div>
      <Router>
      <Header/>
      <Routes>
          <Route exact path="/" element = {<WelcomeMessage/>} />
          <Route exact path="/register" element={<RegistrationPage/>} />
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/groups" element={<MainPage/>} />
          <Route exact path="/profile" element={<ProfilePage/>} />
          <Route exact path = "/groups/:groupId" element={<CoursesPage/>}/>
          <Route exact path = "/courses/:courseId" element={<DetailPage/>}/>
      </Routes>
      </Router>
    </div>
  );
};

export default App;