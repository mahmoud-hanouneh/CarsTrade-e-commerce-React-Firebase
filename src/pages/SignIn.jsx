import { useState } from 'react'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

import { ToastContainer, toast } from 'react-toastify';

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const nav = useNavigate()

  const changeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  const submitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const auth = getAuth()
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      if (user) {
        nav('/explore')
      }

    } catch (error) {
      console.log(error.code)
      setLoading(false)
      switch(error.code) {
        case 'auth/network-request-failed':
          toast.error('Network error! check you internet connection')
          break;
        case 'auth/wrong-password':
          toast.error('Wrong email or password!')
          break;
        default:
          toast.error('Something went wrong! please try signing later')
      }
    }
  }

  return (
    <>
   <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
            </div>
            <form className='mt-8 space-y-6' onSubmit={submitHandler}>

              <FormControl>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <Input placeholder='Enter your email'onChange={changeHandler} value={email} id='email' type='email' placeholer='Email' />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    value={password}
                    onChange={changeHandler}
                    id='password'
                    pr='4.5rem'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
             

               <div className="flex items-center justify-between">

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Dont have an account?
                </a>
              </div>
            </div>
              <Button
              className='mt-2'
              type='submit' 
              isLoading={loading} 
              loadingText='Signing in' 
              colorScheme='teal'>
                Sign In
              </Button>
             
      </form>
      </div>
    </div>
    <ToastContainer /> 
    </>
  )
}
