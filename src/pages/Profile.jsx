import { useState, useContext, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { setDoc, doc, collection, query, getDocs, where, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import LoadingContext from '../contexts/loading/LoadingContext' 
import ListingItem from '../components/listings/ListingItem'
import FadeSpinner from '../components/feedback/FadeSpinner'
import UserContext from '../contexts/user/UserContext'
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
    email: auth.currentUser.email,
  })
  const { name, email } = formData

  const [listings, setListings] = useState(null)

  const { spinnerLoading, buttonLoading, dispatch } = useContext(LoadingContext)
  const { dispatch: setUserState } = useContext(UserContext)


  useEffect(() => {

    const fetchUserListings = async () => {
      const listingRef = collection(db, 'cars')

      const q = query(
        listingRef,
        where('userRef', '==', auth.currentUser.uid),
      )

      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
      dispatch({ type: 'STOP_SPINNER_LOADING' })
    }

    fetchUserListings()
  }, [auth.currentUser.uid])

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
          email
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
      setUserState({ type: 'SET_USER', payload: name})

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

  const deleteListing = async (listingId) => {
    if (window.confirm('Are you sure')) {
      await deleteDoc(doc(db, 'cars', listingId))
      const updatedListings = listings.filter(listing => listing.id !== listingId)
      setListings(updatedListings)
      toast({
        title: 'Success',
        description: "Deleted",
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  return (
    <>
    <div className='container p-9'>
      <Flex className='mb-4'>
        <Box>
          <Heading>My Info</Heading>
        </Box>
        <Spacer />
        <Box>
          <Button
            className='mx-1'
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
          <Button 
            className='mx-1'
            onClick={() => signoutHandler()}
            variant='outline'
            colorScheme='teal' 
            size='sm'
          >
            Singout
          </Button>
        </Box>
      </Flex>
      
     
      <Input className='mt-3' id='name' value={name} onChange={changeHandler} disabled={!isEditing} />
      <Input className='mt-3' id='email' value={email} onChange={changeHandler} disabled />

      <Heading className='mt-5'>My Advertisments</Heading>
      { spinnerLoading && <FadeSpinner  /> }
  
      {
        listings?.length > 0 && 
        <>
          {listings.map(listing => (
            <ListingItem 
              id={listing.id}
              key={listing.id}
              data={listing.data}
              deleteListing={() => deleteListing(listing.id)}
              editListing
            />
          ))}
        </>
      }

    </div>
    </>
    
  )
}

export default Profile