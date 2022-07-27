import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useToast } from '@chakra-ui/react'

const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [ownerData, setOwnerData] = useState(null)
  const params = useParams()
  const toast = useToast()

  useEffect(() => {

    const getOwnerData = async () => {
      try {
        const docRef = doc(db, 'users', params.carOwnerId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
          setOwnerData(docSnap.data())
        } else {
          toast({
            title: 'Owner Not Found',
            description: "Cound not find the owner",
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
    
        }
      } catch (error) {
        console.log(error.code)
      }
    }
    getOwnerData()

  }, [params.carOwnerId])

  return (
    <div>
      {!ownerData && (
        <h1>found it!</h1>
      )}
    </div>
  )
}

export default Contact