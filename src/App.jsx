import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Navbar from './components/Navbar';
import MessageForm from './components/MessageForm';
import MainChatAdmin from './Pages/callAdmin/MainChatAdmin';
import History from './Pages/callAdmin/History';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import store from './app/store';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProtectedRoute from './Pages/ProtectedRoute';
import { getMe } from './features/authSlice';
import Unauthorized from './Pages/Unauthorized';
import Register from './Pages/Register'
import Heading from './components/molekules/Heading'
const MainApp = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Hubungi-Admin"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <MainChatAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/history" element={<History />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const Home = () => (
  <>
    <Navbar />
    <Container maxWidth="lg">
      <MessageForm />
      <Heading />
    </Container>
  </>
);

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
