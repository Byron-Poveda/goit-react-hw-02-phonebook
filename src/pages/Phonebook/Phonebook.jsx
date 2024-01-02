import React, { useCallback, useEffect, useRef, useState } from 'react';
import ContactForm from './partials/contactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from 'redux/thunks';
import Contacts from 'pages/Phonebook/partials/contacts/Contacts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Loader from 'components/Loader/Loader';
import { useDeviceDetect } from 'hooks/deviceDetect/useDeviceDetect';
import { globalIcons } from 'assets/globalIcons';

const Phonebook = () => {

  const [phonebookHover, setPhonebookHover] = useState(false)
  const [addContactHover, setAddContactHover] = useState(false)
  const [isPhonebook, setIsPhonebook] = useState(false)
  const [isAddContacts, setIsAddContacts] = useState(true)
  const inactivityTimeoutRef = useRef(null);
  let removeTokenTimeout;

  const loading = useSelector(state => state.auth.isLoading)
  const token = useSelector(state => state.auth.token);
  
  const dispatch = useDispatch()
  const { isMobile } = useDeviceDetect()

  const resetInactivityTimeout = useCallback(() => {
    clearTimeout(inactivityTimeoutRef.current);

    inactivityTimeoutRef.current = setTimeout(() => {
      dispatch(logOutUser());

    }, 3600000);

    startRemoveTokenTimeout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const startRemoveTokenTimeout = () => {
    clearTimeout(removeTokenTimeout);

    removeTokenTimeout = setTimeout(() => {
      localStorage.removeItem('token');
    }, 3600000); 
  };

  useEffect(() => {
    const handleInteraction = () => {
      resetInactivityTimeout();
    };

    const handleKeyDown = event => {
      handleInteraction();
    };

    document.addEventListener('mousemove', handleInteraction);
    document.addEventListener('keydown', handleKeyDown);

    resetInactivityTimeout();

    return () => {
      clearTimeout(removeTokenTimeout);
      clearTimeout(inactivityTimeoutRef.current);
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    dispatch,
    token,
    resetInactivityTimeout,
    removeTokenTimeout,
  ]);

    const handlePages = () => {
        if(isPhonebook) {
          setIsPhonebook(false)
          setIsAddContacts(true)
          return
        }
        if(isAddContacts) {
          setIsAddContacts(false)
          setIsPhonebook(true)
          return
        }
    }

    useEffect(()=>{
      if(!isMobile) {
        setIsAddContacts(true)
        setIsPhonebook(true)
        return
      }
      setIsAddContacts(true)
      setIsPhonebook(false)
    },[isMobile])

  return (
    <div className='flex w-full h-screen justify-center relative'>
      {isAddContacts && 
        <div className='w-1/2 px-[35px] flex justify-center items-center relative bg-[#9994f2] max-md:w-full max-md:bg-gray-100'>
          <div className='z-[2] relative max-w-[400px] w-full'>
            <h1 className='font-rubik text-white max-md:text-black text-[42px] mb-[15px]'>Phonebook</h1>
            <ContactForm />
          </div>
          {!isMobile && <div className='absolute w-full h-screen bg-[#00000075] top-0 left-0'></div> } 
        </div>
      }
      {isPhonebook && 
        <div className={`hidden w-1/2 px-[35px] justify-center items-center md:flex bg-gray-100 ${isPhonebook && isMobile ? '!flex w-full' : ''}`}>
          <Contacts />
        </div>
      }
      <button 
        className={`absolute ${loading ? 'top-[8px]' : 'top-[10px]'} ${loading ? 'right-[8px]' : 'right-[10px]'} !h-[35px`}
        onClick={()=>dispatch(logOutUser())}
      >
        { loading ? <Loader variant='circle' fill='#000' width='30px' height='30px'/> : <FontAwesomeIcon icon={faRightFromBracket} className='text-black w-[20px] h-[20px]' /> }
      </button>
      {isMobile && 
        <ul className='fixed left-[10px] top-[20px] flex flex-col gap-[15px]'>
          <li 
            onMouseEnter={()=>setAddContactHover(true)} 
            onMouseLeave={()=>setAddContactHover(false)} 
            onClick={handlePages}
            className={`transition-all duration-700 w-[100px] border border-phonebook-indigo flex justify-end relative -left-[30px] py-[8px] pr-[15px] rounded-e-[30px] cursor-pointer ${addContactHover || isAddContacts ? 'bg-phonebook-indigo-dark scale-[1.13]' : ''}`}
          >
            <img 
              src={globalIcons.addContact} 
              alt="addContact icon" 
              className={`transition-all duration-700 ${addContactHover ? 'opacity-0' : ''}`} 
            />
            <img 
              src={globalIcons.addContactHover} 
              alt="addContactHover icon" 
              className={`transition-all duration-700 opacity-0 absolute ${addContactHover || isAddContacts ? '!opacity-100' : ''}`} 
            />
          </li>
          <li 
            onMouseEnter={()=>setPhonebookHover(true)} 
            onMouseLeave={()=>setPhonebookHover(false)} 
            onClick={handlePages}
            className={`transition-all duration-700 w-[100px] border border-phonebook-indigo flex justify-end relative -left-[30px] py-[8px] pr-[15px] rounded-e-[30px] cursor-pointer ${phonebookHover || isPhonebook ? 'bg-phonebook-indigo-dark scale-[1.13]' : ''}`}
          >
            <img 
              src={globalIcons.phonebook} 
              alt="phonebook icon" 
              className={`transition-all duration-700 ${phonebookHover ? 'opacity-0' : ''}`} 
            />
            <img 
              src={globalIcons.phonebookHover} 
              alt="phonebookHover icon" 
              className={`transition-all duration-700 opacity-0 absolute ${phonebookHover || isPhonebook ? '!opacity-100' : ''}`} 
            />
          </li>
        </ul> 
      }
    </div>
  );
};

export default Phonebook;
