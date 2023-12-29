import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faAt  } from '@fortawesome/free-solid-svg-icons'
import Input from 'components/input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from 'redux/thunks'
import { Notify } from 'notiflix'
import { globalIcons } from '../../assets/globalIcons.js'
import Button from 'components/button/Button.jsx'
import { useDeviceDetect } from 'hooks/deviceDetect/useDeviceDetect.jsx'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loading = useSelector(state => state.auth.isLoading)

  const { isMobile } = useDeviceDetect()

  const dispatch = useDispatch()

  const submitForm = (e) => {
    e.preventDefault()
    if (!email || !password) return Notify.warning("Please fill all fields")
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className="h-screen flex justify-between">
      <div className="hidden relative md:flex w-full md:w-1/2"
      >
        <img src={globalIcons.loginBg} alt="login background" />
        <div className="mx-auto absolute top-0 left-0 w-full bg-[#000000cc] h-screen flex items-center">
          <div className='flex flex-col mx-auto'>
            <h1 className="text-white font-bold text-[48px] font-rubik">Contacts <span className='text-phonebook-indigo-dark text-[56px] uppercase'>App</span></h1>
            <p className="text-white mt-1">The simplest app to use</p>
            <div className="flex justify-center md:justify-start mt-6">
                <Link
                  to='/signup'
                  className="hover:bg-phonebook-indigo hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-phonebook-indigo-dark mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                >
                  Get Started
                </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100">
        <div className="w-full px-[20px] flex flex-col gap-[8px]">
        {isMobile && <h1 className="text-black text-center font-bold font-rubik"
          style={{ fontSize: 'clamp(28px, 10vw, 48px)' }}
          >
            Contacts 
          <span className='ml-[7px] text-phonebook-indigo-dark text-[56px] uppercase'
            style={{ fontSize: 'clamp(28px, 10vw, 48px)' }}
          >
            App
          </span>
        </h1>
        }
          <form onSubmit={submitForm} className="bg-white border border-phonebook-indigo-dark w-full rounded-md shadow-2xl p-5 min-w-[206px] max-w-[480px] my-0 mx-auto">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello!</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
            <div className='flex flex-col gap-[20px]'>
              <Input
                modelValue={email}
                required
                disabled={loading}
                type='email'
                autoComplete='on'
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Email Address'
              >
                <FontAwesomeIcon icon={faAt} className='text-[#9ca3af]'></FontAwesomeIcon>
              </Input>
            <Input
              modelValue={password}
              required
              disabled={loading}
              type='password'
              onChange={(e)=>setPassword(e.target.value)}
              placeholder='Password'
            >
              <FontAwesomeIcon icon={faLock} className='text-[#9ca3af]'></FontAwesomeIcon>
              </Input>
            </div>
            <Button
              type='submit'
              classButton='mt-[20px]'
              loading={loading}
              isDisabled={loading}
            >
              Login
            </Button>
            <div className="flex justify-between mt-4 max-sm:flex-col max-sm:gap-[20px]">
              {/* <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</span> */}
              <Link 
                to='/signup'
                className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Don't have an account yet?
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login