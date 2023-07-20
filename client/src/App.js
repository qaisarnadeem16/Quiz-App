import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage, SignupPage, LoginPage, ResetPasswordPage, QuizShedule, QuizPlay } from './Routes/Route'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './Redux/store'
import { useEffect } from 'react';
import { loadUser } from './Redux/Action/User';
import ProtectedRoute from './Routes/ProtectedRoute';
import DashboardHome from './components/DashboardHome';
import Questions from './components/Question/Questions';
import QuizResult from './components/QuizShedule/QuizResult';
import Profile from './components/Profile';
import UpdateQuestion from './components/Question/UpdateQuestion';
import WatchQuestion from './components/Question/WatchQuestion';
import UserManagement from './pages/UserManagement';
import AdminQuiz from './pages/AdminQuiz';
import UserSheduleQuiz from './pages/UserSheduleQuiz';
import PlayedQuiz from './pages/PlayedQuiz';
import UserWallet from './pages/UserWallet';
import EditQuiz from './components/QuizShedule/EditQuiz';
import AddQuizPkg from './pages/AddQuizPkg';
import UserJoinPkg from './pages/UserJoinPkg';

function App() {
  useEffect(() => {
    Store.dispatch(loadUser())
  })
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/updateQuestion/:id" element={
            <ProtectedRoute>
              <UpdateQuestion />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/checkQuestion/:id" element={
            <ProtectedRoute>
              <WatchQuestion />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/questions" element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/QuizShedule" element={
            <ProtectedRoute>
              <QuizShedule />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/quizplay/:id" element={
            <ProtectedRoute>
              < QuizPlay />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/result/:id" element={
            <ProtectedRoute>
              < QuizResult />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              < Profile />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/userManagement" element={
            <ProtectedRoute>
              < UserManagement />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/AdminQuiz" element={
            <ProtectedRoute>
              < AdminQuiz />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/userQuiz" element={
            <ProtectedRoute>
              < UserSheduleQuiz />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/playedQuiz" element={
            <ProtectedRoute>
              < PlayedQuiz />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/wallet" element={
            <ProtectedRoute>
              < UserWallet />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/editQuiz/:id" element={
            <ProtectedRoute>
              < EditQuiz />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/addQuizPkg" element={
            <ProtectedRoute>
              < AddQuizPkg />
            </ProtectedRoute>
          } />

          <Route path="/dashboard/userJoinPkg" element={
            <ProtectedRoute>
              < UserJoinPkg />
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
