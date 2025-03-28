import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './Layout'
import DashboardPage from './pages/DashboardPage'
import ActivitiesPage from './pages/ActivitiesPage'
import TrainersPage from './pages/TrainersPage'
import StudentsPage from './pages/StudentsPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/activities' element={<ActivitiesPage />} />
          <Route path='/trainers' element={<TrainersPage />} />
          <Route path='/students' element={<StudentsPage/>} />
        </Route>
      </Routes>
    </Router>
  );
}
