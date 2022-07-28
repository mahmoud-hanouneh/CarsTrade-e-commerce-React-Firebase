import { useEffect, useState } from 'react'
import ListingItem from '../components/listings/ListingItem'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import { collection, getDocs, where, query } from 'firebase/firestore'
import Spinner from '../components/feedback/Spinner'
import ScaleSpinner from '../components/feedback/ScaleSpinner'
import { Heading } from '@chakra-ui/react'


const Listings = () => {
  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState(null)

  const params = useParams()  
  useEffect(() => {

    const fetchCars = async () => {
        try {
            const carsRef = collection(db, 'cars')

            const q = query(
                carsRef,
                where('type', '==', params.categoryName) 
                )
            const qSnap = await getDocs(q)
    
            const carsArray = []
            qSnap.forEach((car) => {
                return carsArray.push({
                    id: car.id,
                    data: car.data()
                })
            })
            setCars(carsArray)
            setLoading(false)
        } catch (error) {
            console.log(error.code)
        }
       
      }
    fetchCars()
  }, [params.categoryName])

  return (
    <>
        <Heading as='h2' size='xl' mb='2rem' ml='6rem'>
            {params.categoryName === 'rent' 
                ? 'Cars For Rent'
                : 'Cars For Sale'
            }
        </Heading>
        {loading ? <ScaleSpinner /> : cars && cars.length > 0 ?
            <>
                {cars.map(car => {
                    return (
                        <ListingItem 
                            id={car.id}
                            key={car.id}
                            data={car.data}
                        />
                    )
                    })}
            </> : 'No Listings'
        }
       
    </>
  )
}

export default Listings