import { useState, useContext, useEffect, useRef } from 'react'
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import LoadingContext from '../contexts/loading/LoadingContext'
import LogoImg from '../images/logo.png'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  useToast,
  Box,
  Text,
  Center
} from '@chakra-ui/react'
import OAuth from '../components/OAuthGoogle/OAuth'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false) 

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const { buttonLoading, dispatch } = useContext(LoadingContext)

  const nav = useNavigate()
  const toast = useToast()
  const auth = getAuth()
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              nav('/')
            }
        })
    }

    return () => {
        isMounted.current = false
    }

  }, [isMounted])

  const changeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  const submitHandler = async e => {
    e.preventDefault()
    dispatch({ type: 'START_LOADING' })
    const auth = getAuth()
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user
      if (user) {
        dispatch({ type: 'STOP_LOADING' })
        nav('/explore')
        toast({
          position: 'bottom-left',
          render: () => (
            <Box color='#ffd056' p={3} bg='orange.500'>
              <Text color='#ffffff'>Hello {user.displayName}</Text>
            </Box>
          ),
        })
      }

    } catch (error) {
      console.log(error.code)
      dispatch({ type: 'STOP_LOADING' })
      switch(error.code) {
        case 'auth/network-request-failed':
          toast({
            title: 'Error!',
            description: "Network error! check you internet connection",
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          break;
        case 'auth/wrong-password':
          toast({
            title: 'Wrong Enteries',
            description: "Wrong email or password!",
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          break;
        default:
          toast.error('Something went wrong! please try signing later')
          toast({
            title: 'Error!',
            description: "Something went wrong! please try signing later",
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
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
                  src={LogoImg}
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
                    <Link to='/sign-up' className="font-medium text-indigo-600 hover:text-indigo-500">
                      Dont have an account?
                    </Link>
                  </div>
                </div>
                
                <Button
                  className='mt-2'
                  type='submit' 
                  isLoading={buttonLoading} 
                  loadingText='Signing in' 
                  colorScheme='teal'>
                    Sign In
                </Button>
               
              </form>
             <OAuth />
        </div>
      </div>
    </>
  )
}
