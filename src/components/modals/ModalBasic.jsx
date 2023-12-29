import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function ModalBasic({ close, isActive, children }) {
  return (
    <>
        <div onClick={close} className={`fixed top-0 left-0 h-screen w-screen z-[-1] invisible opacity-0 bg-[#0D0D0D] transition-all duration-500 ${isActive ? 'opacity-[0.7] !z-[99] !visible' : ''}`}></div>
        <div className={`flex z-[-1] justify-center items-center opacity-0 fixed top-0 left-0 w-full h-screen ${isActive ? '!translate-y-0 !opacity-100 !z-[999]' : ''}`}>
            <div
                style={{
                    background: 'linear-gradient(270deg, #DAE6F1 0%, #FAFCFE 100%)',
                    boxShadow: '8.781204223632812px 8.781204223632812px 26.343612670898438px 0px #C1D8EA, -8.781204223632812px -8.781204223632812px 26.343612670898438px 0px rgba(255, 255, 255, 0.50)'            
                }} 
                className='rounded-lg p-[10px] relative min-w-[200px]'>
                { children }
                <FontAwesomeIcon onClick={close} icon={faXmark} className='transition-all duration-300 cursor-pointer text-[#000] hover:text-phonebook-indigo absolute top-[10px] right-[10px]'/>
            </div>
        </div>
    </>
  )
}

ModalBasic.propTypes = {
    close: PropTypes.func,
    isActive: PropTypes.bool,
    children: PropTypes.node,
}

export default ModalBasic
