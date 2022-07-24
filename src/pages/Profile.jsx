import { useState, useContext } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import LoadingContext from '../contexts/loading/loadingContext' 
import {
  Button,
  Heading,
  Input,
  Flex,
  Box,
  Spacer,
  useToast
} from '@chakra-ui/react'

import {  
  CheckIcon,
  EditIcon,
} from '@chakra-ui/icons'

const Profile = () => {
  const navigate = useNavigate()
  const auth = getAuth()
  const toast = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { buttonLoading, dispatch } = useContext(LoadingContext)

  const { name, email } = formData
  const submitHandler = async (e) => {
    
    dispatch({ type: 'START_LOADING' })
    try {
      if (name !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await setDoc(userRef, {
          name,
        })
      }
      console.log('success')
      toast({
        title: 'Edited successfully',
        description: "We've edited yout info",
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      dispatch({ type: 'STOP_LOADING' })

    } catch (error) {
      console.log(error.code)
      toast({
        title: 'Something went wrong!',
        description: "Please try later",
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      dispatch({ type: 'STOP_LOADING' })
    }
    
  }
  
  const changeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  const signoutHandler = () => {
    auth.signOut()
    navigate('/sign-in')
  }
  return (
    <div className='container p-4'>
      <Flex className='mb-4'>
        <Box>
          <Heading>My Info</Heading>
        </Box>
        <Spacer />
        <Box>
        <Button
          variant={isEditing ? 'outline' : 'solid'}
          isLoading = {buttonLoading}
          onClick={() => {
            isEditing && submitHandler()
            setIsEditing(prev => !prev)
          }}  
          colorScheme='teal' 
          size='sm'
          loadingText='Editing ..'
          >
              {isEditing ? 'Save' : 'Edit'}
              {isEditing ? <CheckIcon className='ml-2' /> : <EditIcon className='ml-2' /> }
              
        </Button>
        <Button onClick={() => signoutHandler()}>
          Singout
        </Button>
        </Box>
      </Flex>
      
     
      <Input className='mt-3' id='name' value={name} onChange={changeHandler} disabled={!isEditing} />
      <Input className='mt-3' id='email' value={email} onChange={changeHandler} disabled={!isEditing} />
    </div>
  )
}

export default Profile