import React, { useState } from 'react';
import ContactForm from './partials/contactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from 'redux/thunks';
import Contacts from 'pages/Phonebook/partials/contacts/Contacts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Loader from 'components/Loader/Loader';
import { useDeviceDetect } from 'hooks/deviceDetect/useDeviceDetect';

const Phonebook = () => {

  const loading = useSelector(state => state.auth.isLoading)
  const [isActive, setIsActive] = useState(false)

  
  const dispatch = useDispatch()
  const { isMobile } = useDeviceDetect()

    const handleIsActive = () => {
        setIsActive(!isActive)
    }

  return (
    <div className='flex w-full h-screen justify-center relative'>
      <div className='w-1/2 px-[35px] pt-[150px] relative bg-phonebook-indigo max-md:w-full max-md:bg-gray-100'>
        <div className='z-[2] relative max-w-[400px] mx-auto'>
          <h1 className='font-rubik text-white max-md:text-black text-[42px] mb-[15px]'>Phonebook</h1>
          <ContactForm />
        </div>
        {!isMobile ? <div className='absolute w-full h-screen bg-[#00000075] top-0 left-0'></div> :
        <div className='absolute top-[10px] right-[10px]'>
            <ul onClick={handleIsActive} className={`flex z-[999] relative flex-col w-[24px] h-[24px] gap-[5px] cursor-pointer HeaderMenuMobile__burger-menu ${isActive ? '!h-[19px] !w-[21px]' : ''}`}>
                <li className={`bg-black w-full h-[3px] rounded-[5px] transition-all duration-500 origin-left ${isActive ? 'rotate-[45deg]' : ''}`}></li>
                <li className={`bg-black w-full h-[3px] rounded-[5px] transition-all duration-500 origin-left ${isActive ? 'opacity-0' : ''}`}></li>
                <li className={`bg-black w-full h-[3px] rounded-[5px] transition-all duration-500 origin-left ${isActive ? '-rotate-[45deg]' : ''}`}></li>
            </ul> 
            <ul className={`flex flex-col item-center top-0 fixed py-[100px] left-[200%] gap-[32px] w-full h-full bg-phonebook-indigo z-[99] transition-all duration-500 opacity-0 ${isActive ? '!left-[40%] !opacity-100' : ''}`}>
                <li className='pointer'>
                    <span
                        onClick={handleIsActive}
                        className='--modal'
                        to='/diary'
                    >
                        Diario
                    </span>
                </li>
                <li className='pointer'>
                    <span
                        onClick={handleIsActive}
                        className='--modal'
                        to='/calculator'
                    >
                        Calculadora
                    </span>
                </li>
            </ul>
        </div>
        }
      </div>
      <div className='hidden w-1/2 px-[35px] pt-[150px] md:block bg-gray-100'>
        <Contacts />
        <button 
          className={`absolute ${loading ? 'top-[8px]' : 'top-[10px]'} ${loading ? 'right-[8px]' : 'right-[10px]'} !h-[35px`}
          onClick={()=>dispatch(logOutUser())}
        >
          { loading ? <Loader variant='circle' fill='#000' width='30px' height='30px'/> : <FontAwesomeIcon icon={faRightFromBracket} className='text-black w-[20px] h-[20px]' /> }
        </button>
      </div>
    </div>
  );
};

export default Phonebook;
