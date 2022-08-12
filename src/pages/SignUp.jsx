import { useState, useContext } from 'react'
import LogoImg from '../images/logo.png'

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  useToast,
  Center,
  Text
} from '@chakra-ui/react'
import OAuth from '../components/OAuthGoogle/OAuth'

// firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

// react-router-dom
import { Link, useNavigate } from 'react-router-dom'

//user context
import UserContext from '../contexts/user/UserContext'
const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const { fullName, email, password } = formData

  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()
  const toast = useToast()
  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const auth = getAuth()
    setLoading(true)
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth, 
        email,
        password
        )
      const user = userCredentials.user
      console.log(user)
      console.log(userCredentials)
      updateProfile(auth.currentUser, {
        displayName: fullName
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      dispatch({ type: 'SET_USER', payload: auth.currentUser.displayName})
      navigate('/')

    } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            toast({
              title: 'Alert',
              description: "The email is already in use!",
              position: 'top',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            break;
          default:
            toast({
              title: 'Fail',
              description: "Somethin went wrong!",
              position: 'top',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            break;
        }
        setLoading(false)     
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
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
            </div>
            <form className='mt-8 space-y-6' onSubmit={submitHandler}>
              <FormControl isRequired>
                <FormLabel htmlFor='fullName'>Full Name</FormLabel>
                <Input onChange={changeHandler} value={fullName} id='fullName' type='text' placeholer='Full Name' />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <Input onChange={changeHandler} value={email} id='email' type='email' placeholer='Email' />
              </FormControl>

              <FormControl isRequired>
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
                <Link to='/forgot-password' className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <Button
              className='mt-2'
              type='submit' 
              isLoading={loading} 
              loadingText='Submitting' 
              colorScheme='teal'>
                Register
            </Button>
             
      </form>
      <OAuth />
      </div>
    </div>
     
    </>
  )
}

export default SignUp