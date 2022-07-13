import { useState, useEffect } from 'react'
import { getDoc, doc, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/feedback/Spinner'
import { db } from '../firebase.config'


const ListingDetails = () => {

  const [carListing, setCarListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {

    const fetchCarListing = async () => {
      try {
        const docRef = doc(db, 'cars', params.listingId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setCarListing(docSnap.data())
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCarListing()

  }, [params.listingId, navigate])
  if (loading) {
    return <Spinner />
  }
  return (
    <div>
     {auth.currentUser.uid === carListing.userRef ? 
     <h1>Yes</h1> 
    :
    <h1>No</h1>
    }
    </div>
  )
}

export default ListingDetails