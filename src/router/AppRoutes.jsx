import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Phonebook from '../pages/Phonebook/Phonebook';
import { useEffect } from 'react';

const AppRoutes = [
  {
    title: 'Phonebook',
    name: 'Phonebook',
    path: '/phonebook',
    element: () => <Phonebook />,
    checkAuth: true,
    redirectRoute: '/login',
  },
  {
    title: 'Log In',
    name: 'logIn',
    path: '/login',
    element: () => <Login />,
    checkAuth: false,
    redirectRoute: '/phonebook',
  },
  {
    title: 'Sign Up',
    name: 'signUp',
    path: '/signup',
    element: () => <SignUp />,
    checkAuth: false,
    redirectRoute: '/phonebook',
  },
  {
    title: 'Log in',
    name: 'all',
    path: '*',
    element: () => <Login />,
    checkAuth: false,
    redirectRoute: '/login',
  },
];

const AppRoutesContainer_ = ({ children }) => {
  useEffect(() => {
    window.myApp = {
      state: {
        isLoaded: true,
      },
    };
  }, []);
  return <>{children}</>;
};
export const AppRoutesContainer = AppRoutesContainer_;
export default AppRoutes;
