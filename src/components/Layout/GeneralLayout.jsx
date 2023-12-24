import { useEffect } from 'react';
// import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const GeneralLayout = ({ children }) => {

  // const loading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);

  // const showComponent = useMemo(() => {
  //   const ROUTES_WHERE_NOT_SHOWN_HEADER_AUTH = ['/diary', '/calculator'];

  //   const shouldHide = ROUTES_WHERE_NOT_SHOWN_HEADER_AUTH.some(route => {
  //     return location.pathname === route;
  //   });

  //   return !shouldHide;
  // }, [location.pathname]);

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
    <div>
      {children}
      {/* <Loader active={loading} /> */}
    </div>
  );
};
export default GeneralLayout;
