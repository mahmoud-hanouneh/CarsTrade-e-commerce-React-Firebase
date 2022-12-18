import { useLocation, useNavigate } from 'react-router-dom'
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { FcGoogle } from 'react-icons/fc'
import { Text, Center, useToast } from '@chakra-ui/react'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()  

  const clickHandler = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
        toast({
            title: 'Error!',
            description: "Couldn't authorize with Google! Try later",
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
    }
  }

  return (
      <Center>
          <Text className='mr-3' fontWeight="bold">{location.pathname==='/sign-up' ? 'SignUp' : 'Continue'} With </Text> 
          <FcGoogle 
            onClick={clickHandler} 
            className='cursor-pointer' 
            size={50} 
          />
      </Center>
  )
}

export default OAuth