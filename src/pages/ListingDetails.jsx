import { useState, useEffect } from 'react'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Spinner from '../components/feedback/Spinner'
import { Image, Container, Box, Heading, Stack, Text, Button, Divider, List, ListItem, ListIcon } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { AiFillCheckCircle } from 'react-icons/ai'
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

        <Heading pl={4} className='mb-2' as='h2' size='xl'>
          {carListing.manufacturer}
        </Heading>   
        <Heading pl={4} className='mb-2' as='h4' size='md'>
          {carListing.modelName}
        </Heading>

        <List p={4} spacing={3}>
              <ListItem>
                <ListIcon as={AiFillCheckCircle} color='orange.500' />
                Color: {carListing.color}
                <Divider variant='solid' />
              </ListItem>

              <ListItem>
                <ListIcon as={AiFillCheckCircle} color='orange.500' />
                Year: {carListing.modelYear}
                <Divider variant='solid' />
              </ListItem>

              <ListItem>
                <ListIcon as={AiFillCheckCircle} color='orange.500' />
                Transmission: {carListing.transmission}
                <Divider variant='solid' />
              </ListItem>

              <ListItem>
                <ListIcon as={AiFillCheckCircle} color='orange.500' />
                Mileage: {carListing.mileage} {' '} Km
                <Divider variant='solid' />
              </ListItem>

              <ListItem as={carListing.offer && 's'}>
                <ListIcon as={AiFillCheckCircle} color='orange.500' />
                {carListing.type === 'sale' ? 'Price:' : 'Rent:'}
                { ' ' } {carListing.price} $ { ' ' }
                {carListing.type === 'rent' && '/Month'} 
                <Divider variant='solid' />
              </ListItem>
              
              {carListing.notes !== '' && 
                <ListItem>
                  <ListIcon as={AiFillCheckCircle} color='orange.500' />
                  Note: {carListing.notes}
                  <Divider variant='solid' />
                </ListItem>
              }

              {carListing.offer && (
                <ListItem>
                  <ListIcon as={AiFillCheckCircle} color='orange.500' />
                  Discounted Price: { ' ' } {carListing.discountedPrice} { ' ' } $
                  <Divider variant='solid' />
                </ListItem>
              )}
             
             <ListItem>
                  <ListIcon as={AiFillCheckCircle} color='orange.500' />
                  City: {carListing.city}
                  <Divider variant='solid' />
             </ListItem>

              <ListItem>
                    <ListIcon as={AiFillCheckCircle} color='orange.500' />
                    Location: {carListing.location}
                    <Divider variant='solid' />
              </ListItem>

        </List>

          {auth.currentUser?.uid !== carListing.userRef && 
          <Link to={`/contact/${carListing.userRef}?listingName=${carListing.modelName}`}>
           <Button
            className='my-4'
            rightIcon={<ArrowForwardIcon />} 
            size='lg' 
            colorScheme='orange' 
            variant='outline'>
              Contact Owner
            </Button>
          </Link>
         
        }       
        </Box>
       
    </Box>
  )
}

export default ListingDetails