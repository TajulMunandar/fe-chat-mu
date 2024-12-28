import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe, logoutUser } from '../features/authSlice';
import SideMenu from '../components/molekules/SideMenu';
import Header from '../components/organism/Header';
import MainContent from '../components/organism/MainContent';

const DashboardLayout = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  const handleEscape = (event) => event.key === 'Escape' && closeSideMenu();

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  });

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>
      <aside className="z-20 hidden w-64 overflow-y-auto shadow-lg bg-[#006633] transition-all md:block flex-shrink-0">
        <SideMenu user={user} />
      </aside>
      <div className={`fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center ${
        isSideMenuOpen ? 'opacity-100' : 'opacity-0'
      }`} style={{ transition: 'opacity 150ms ease-in-out', display: isSideMenuOpen ? 'flex' : 'none' }}></div>
      <aside
        className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden ${
          isSideMenuOpen ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-20'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeSideMenu();
        }}
      >
        <SideMenu user={user} />
      </aside>
      <div className="flex flex-col flex-1 w-full">
        <Header toggleSideMenu={toggleSideMenu} handleLogout={handleLogout} />
        <MainContent user={user} />
      </div>
    </div>
  );
}

export default DashboardLayout;
