import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import WelcomeMessage from './Components/WelcomeMessage';
import RegistrationPage from "./Components/RegistrationPage";
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import ProfilePage from './Components/ProfilePage';
import CoursesPage from './Components/CoursesPage';
import DetailPage from './Components/DetailPage';
import CoursesMyPage from './Components/CoursesMyPage';
import CoursesTeachingPage from './Components/CoursesTeachingPage';

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.registration.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<WelcomeMessage />} />
        <Route exact path="/register" element={<RegistrationPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/groups" element={<MainPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/groups/:groupId" element={<CoursesPage />} />
        <Route exact path="/courses/:courseId" element={<DetailPage />} />
        <Route exact path="/courses/my" element={<CoursesMyPage />} />
        <Route exact path="/courses/teaching" element={<CoursesTeachingPage />} />
      </Routes>
    </div>
  );
};

export default App;
