import { useEffect, useState } from 'react'
import ListingItem from '../components/ListingItem'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'
import { collection, getDocs, where, query } from 'firebase/firestore'
import Spinner from '../components/feedback/Spinner'

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
  }, [])

  return (
    <>
        <h2>
            {params.categoryName === 'rent' 
                ? 'Cars for rent'
                : 'Cars for sale'
            }
        </h2>
        {loading ? <Spinner /> : cars && cars.length > 0 ?
            <>
                {cars.map(car => {
                    return (
                        <ListingItem 
                            id={car.id}
                            key={car.id}
                            info={car.data}
                        />
                    )
                    })}
            </> : 'No Listings'
        }
       
    </>
  )
}

export default Listings