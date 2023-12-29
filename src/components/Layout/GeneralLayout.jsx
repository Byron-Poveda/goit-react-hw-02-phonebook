import { useEffect, useMemo } from 'react';
// import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useGoBack } from '../../hooks/History/useHistory'
import { globalIcons } from 'assets/globalIcons';
import { useLocation } from 'react-router-dom';
import { useDeviceDetect } from 'hooks/deviceDetect/useDeviceDetect';

const GeneralLayout = ({ children }) => {
  
  // const loading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);
  const location = useLocation();
  const history = useGoBack()
  const { isMobile } = useDeviceDetect()


  const showGoBack = useMemo(() => {
    const ROUTES_WHERE_NOT_SHOWN_HEADER_AUTH = ['/login', '/phonebook', '/'];

    const shouldHide = ROUTES_WHERE_NOT_SHOWN_HEADER_AUTH.some(route => {
      return location.pathname === route;
    });

    return !shouldHide;
  }, [location.pathname]);

  useEffect(() => {
    if (error)
      return Notify.failure(error, {
        fontSize: '16px',
        fontFamily: 'Roboto',
        cssAnimationStyle: 'from-right',
        timeout: 900,
      });
  }, [error]);

  return (
    <div className='overflow-hidden w-full h-screen'>
      {children}
      {showGoBack && <button 
        className='fixed top-[10px] left-[10px]' 
        onClick={()=>history.goBack()}
      >
        {isMobile ? 
          <img src={globalIcons.goBackIndigo} alt="go Back Indigo icon" className='w-[60px] hover:scale-110 ease duration-300' />
          :
          <img src={globalIcons.goBackWhite} alt="go Back White icon" className='w-[60px] hover:scale-110 ease duration-300' />
        }
      </button>}
      {/* <Loader active={loading} /> */}
    </div>
  );
};
export default GeneralLayout;
