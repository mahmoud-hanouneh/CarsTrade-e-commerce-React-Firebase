import { useState, useEffect } from 'react'
import { getDoc, doc, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/feedback/Spinner'
import { Image, Container, Box, Heading, Stack, Text, Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
    <Box>
     <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]} 
      slidesPerView={1}
      spaceBetween={50}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
     >
          {carListing.carImages.map((url, index) => (
            
                <SwiperSlide key={index}>
                    <Container key={index} maxW='2xl' centerContent>
                          <Image src={url} objectFit='cover' />
                    </Container>
                </SwiperSlide>
            
        
          ))}
     </Swiper>
     <Box className='p-2'>
        <Heading className='mb-2' as='h2' size='xl'>
          {carListing.manufacturer}
        </Heading>       
        <Stack>
              <Text fontSize='md'>Color: {carListing.color}</Text>
              <Text fontSize='md'>Year: {carListing.modelYear}</Text>
              <Text fontSize='md'>Transmission: {carListing.transmission}</Text>
              <Text fontSize='md'>Mileage: {carListing.mileage} {' '} Km</Text>
              <Text fontSize='md'>
                {carListing.type === 'sale' ? 'Price:' : 'Rent:'}
                { ' ' } {carListing.price} $ { ' ' }
                {carListing.type === 'rent' && '/Month'} 
              </Text>
              {carListing.notes !== '' && 
                <Text fontSize='md'>
                  Note: {carListing.notes}
                </Text>
              }
        </Stack>
        {auth.currentUser.uid === carListing.userRef && 
        <Button
          className='my-4'
          rightIcon={<ArrowForwardIcon />} 
          size='lg' 
          colorScheme='orange' 
          variant='outline'>
            Contact Owner
        </Button>
        }       
        </Box>
       
    </Box>
  )
}

export default ListingDetails