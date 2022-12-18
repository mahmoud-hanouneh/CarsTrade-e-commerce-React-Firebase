import { useState, useContext } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { Alert, AlertIcon, useToast, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import LoadingContext from '../contexts/loading/LoadingContext'
import logoImg from '../images/logo.png'

const ForgotPassword = () => {
   
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const changeHandler = e => setEmail(e.target.value)
  
  const { buttonLoading, dispatch } = useContext(LoadingContext)

  const toast = useToast()

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch({ type: 'START_LOADING' })

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      dispatch({ type: 'STOP_LOADING' })
      toast({
        title: 'Success',
        description: "A recovery email has been sent to you successfully",
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setEmailSent((prev) => !prev)
    } catch (error) {
      console.log(error)
      dispatch({ type: 'STOP_LOADING' })
      toast({
        title: 'Error',
        description: "Something went wrong, please try later",
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
     
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={logoImg}
              alt="Workflow"
            />
            <h2 className="mt-6 mb-10 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
            
            <form onSubmit={submitHandler}>
              <FormControl>
              <FormLabel htmlFor='email'>Email Address</FormLabel>
              <Input placeholder='Enter your email'onChange={changeHandler} value={email} id='email' type='email' placeholer='Email' />
              </FormControl>

              <Alert className="my-3" status='info' hidden={!emailSent}>
                <AlertIcon />
                Check Your Inbox and SPAM Messages
              </Alert>
              
              <Button
                className='mt-2'
                type='submit'
                isLoading={buttonLoading} 
                loadingText='Sending ..' 
                colorScheme='teal'
              >
              Send
              </Button>
             
            </form>
           
          </div>
        </div>
      </div>
        
    </>
  )
}

export default ForgotPassword