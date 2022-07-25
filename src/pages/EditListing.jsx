import { useState, useEffect, useRef, useContext } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp, updateDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config';
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import LoadingContext from '../contexts/loading/loadingContext'

import Spinner from '../components/feedback/Spinner'

import FormRadio from '../components/form/FormRadio'
import FormSelect from '../components/form/FormSelect'
import FormNumber from '../components/form/FormNumber';
import FormCheckbox from '../components/form/FormCheckbox';

import {
  Button,
  FormControl,
  FormLabel,
  Switch,
  Input,
  NumberInput,
  Textarea,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Radio,
  RadioGroup,
  useRadioGroup,
  Stack,
  HStack,
  useToast
} from '@chakra-ui/react'

import { carsData } from '../data/carsData';
import { cities } from '../data/citiesData';
import { colorsData } from '../data/colorsData'

const EditListing = () => {

  const [formData, setFormData] = useState({
    type: 'sale',
    manufacturer: '',
    modelName: '',
    offer: true,
    transmission: 'Automatic',
    modelYear: '2022',
    color: '',
    location: '',
    city: '',
    mileage: '',
    price: '',
    discountedPrice: '',
    notes: '',
    images: {},
    options: 
      {
        leatherSeats: false,
        airBags: false,
        bluetooth: false,
        fogLights: false
      }
    ,
    userRef: ''
  })
  const { buttonLoading, spinnerLoading, dispatch } = useContext(LoadingContext)
  const [listing, setListing] = useState(false)

  const options = ['Manual', 'Automatic']
  const { getRootProps, getRadioProps} = useRadioGroup({
    name: 'framework',
    defaultValue: 'Automatic'
  })
  const group = getRootProps()
  
  
  const toast = useToast()
  const isMounted = useRef(true)
  const auth = getAuth()
  const navigate = useNavigate()
  const params = useParams()
  
  const format = (val) => `$` + val
  const parse = (val) => val.replace(/^\$/, '')
  // set userRef value when the component is mounted
  useEffect(() => {
    if (isMounted) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setFormData(prev => ({
                        ...prev,
                        userRef: user.uid
                    })
                )
                dispatch({ type: 'STOP_SPINNER_LOADING' })

            } else {
                navigate('/sign-in')
            }
        })
    }

    return () => {
        isMounted.current = false
    }

  }, [isMounted])
  
//   useEffect(() => {
//     if(listing && listing.userRef !== auth.currentUser.uid) {
//         toast({
//             title: 'Error',
//             description: "You can't edit this ad!",
//             position: 'top',
//             status: 'error',
//             duration: 3000,
//             isClosable: true,
//           })
//     }
//     navigate('/')
//   })


  useEffect(() => {
    const fetchUserListing = async () => {
        const docRef = doc(db, 'cars', params.listingId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setListing(docSnap.data())
            setFormData({...docSnap.data()})
        } else {
            navigate('/')
            toast({
                title: 'Error',
                description: "The ad is not exist",
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
    }

    fetchUserListing()
  }, [params.listingId, navigate])

  
  const changeHandler = (e) => {
      if (!e.target.files) {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
      }
      if (e.target.files) {
          setFormData(prev => ({
              ...prev,
              images: e.target.files
          }))
      }
    
  }

  const submitHandler = async (e) => {
    
    e.preventDefault()
    dispatch({ type: 'START_LOADING' })
    try {
      const storeImage = async (img) => {

        return new Promise((resolve, reject) => {
            const storage = getStorage()
            const fileName = `${auth.currentUser.uid}-${img.name}-${uuidv4()}`
    
            const storageRef = ref(storage, 'images/' + fileName)
            console.log('this is storageRef ', storageRef)
            // Upload file and metadata to the object 'images/mountains.jpg'
            const uploadTask = uploadBytesResumable(storageRef, img);
    
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              reject(error)
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;
    
                // ...
    
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            }, 
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
            );
          })
        }

      const carImages = await Promise.all(
          [...formData.images].map(img => storeImage(img))
      ).catch((error) => {
          alert(error)
          return
      })
      
      const formDataCopy = {
          ...formData,
          carImages,
          timpestamp: serverTimestamp()
      }
      delete formDataCopy.images

      const docRef = doc(db, 'cars', params.listingId)
      await updateDoc(docRef, formDataCopy)

      dispatch({ type: 'STOP_LOADING' })
      toast({
        title: 'Success',
        description: "Your advertisement has been added successfully",
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate(`/category/${formDataCopy.type}/${docRef.id}`)

    } catch (error) {
      console.log(error.code)
      dispatch({ type: 'STOP_LOADING' })
      toast({
        title: 'Fail',
        description: "Something went wrong!",
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

    }
    
  }
  
 

  if (spinnerLoading) {
      return <Spinner />
  }
  return (
   <>
   <form onSubmit={submitHandler}>
    <div className="container w-9/12 mx-auto p-4">
        <Heading className='mb-8'>Edit my ad</Heading>

        <FormSelect
          name='Manufacturer'
          id='manufacturer'
          value={formData.manufacturer}
          handler={changeHandler}
          selectData={carsData}
          dataKey='manufacturer'
        />

        <FormControl className='mb-3'>
          <FormLabel>Model Name</FormLabel>
            <Input
              variant='flushed'
              id='modelName'
              type='text'
              value={formData.modelName}
              onChange={changeHandler}
              placeholder='ex. Toyota Camry'
            />
        </FormControl>

        <FormSelect
          name='Color'
          id='color'
          value={formData.color}
          handler={changeHandler}
          selectData={colorsData}
          dataKey='color'
        />  

        <FormControl className='mb-3'>
          <RadioGroup id='type' onChange={(value => {setFormData(prev => ({
            ...prev,
            type: value
          }))})} value={formData.type}>
            <Stack spacing={5} direction='row'>
              <Radio colorScheme='teal' value='sale'>Sale</Radio>
              <Radio colorScheme='teal' value='rent'>Rent</Radio>
              <Radio colorScheme='teal' value='lease'>Lease</Radio>
            </Stack>
          </RadioGroup> 
        </FormControl>

        <FormNumber
          labelText='Year'
          inputValue={formData.modelYear}
          max='2022'
          min='1920'
          onChange={(valueString) => setFormData(prev => ({
            ...prev,
            modelYear: valueString
          }))} 
        />
        <FormNumber
          labelText='Mileage'
          inputValue={formData.mileage}
          min='0'
          onChange={(valueString) => setFormData(prev => ({
            ...prev,
            mileage: valueString
          }))} 
        />     


        <FormControl className='mb-3'>
          <HStack onChange={(value) => setFormData(prev => ({
            ...prev,
            transmission: value.target.defaultValue
          }))} 
          {...group}>
          {options.map((value) => {
            const radio = getRadioProps({ value })
            return (
              <FormRadio key={value} {...radio}>
                {value}
              </FormRadio>
            )
          })}
          </HStack>
        </FormControl>
        
        <FormNumber
          labelText='Price'
          inputValue={format(formData.price)}
          min='0'
          onChange={(value) => setFormData(prev => ({
            ...prev,
            price: parse(value)
          }))}
        /> 

        <FormControl className='mb-3' display='flex' alignItems='center'>
          <FormLabel htmlFor='offer' mb='0'>
            Offer
          </FormLabel>
          <Switch colorScheme='teal' id='offer' size='lg' isChecked={formData.offer} 
            onChange = {() => setFormData(prev => ({
              ...prev,
              offer: !prev.offer
            }))}        
          />
        </FormControl>
        <FormControl className='mb-3'>
          <FormLabel htmlFor='discountedPrice' mb='0'>
            Discount
          </FormLabel>
          <NumberInput
              variant='flushed'
              isDisabled={!formData.offer}
              min={0}
              max={formData.price} 
              onChange={(value) => setFormData(prev => ({
                ...prev,
                discountedPrice: parse(value)
              }))} 
              value={format(formData.discountedPrice)}
            >
              <NumberInputField id='discountedPrice' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
        </FormControl>

        <FormSelect
          name='City'
          id='city'
          value={formData.city}
          handler={changeHandler}
          selectData={cities}
          dataKey='city'
        />
        
        <FormControl className='mb-3'>
          <FormLabel htmlFor='location'>Location</FormLabel>
          <Input
            variant='flushed' 
            value={formData.location} 
            onChange={changeHandler} 
            id='location' 
            type='text' 
            placeholder='ex. your neighborhood'
          />
        </FormControl> 
        
        <FormControl className='mb-3'>
          <FormLabel htmlFor='notes'>Notes</FormLabel>
          <Textarea
            variant='flushed'
            id='notes'
            value={formData.notes}
            onChange={changeHandler}
            placeholder='Notes'
            size='sm'
          />
        </FormControl>

        <FormControl className='mb-3'>
          <FormLabel htmlFor='options'>More options</FormLabel>
          <Stack id='options' direction={['column', 'row']} spacing='15px'>
            <FormCheckbox
              checkboxValue='leatherSeats'
              checkStatus = {formData.options.leatherSeats}
              text='Leather Seats'
              change = {() => setFormData(prev => ({
                ...prev,
                options: {
                  ...prev.options,
                  leatherSeats: !prev.options.leatherSeats
                }
              
              }))}
            />
            <FormCheckbox
              checkboxValue='airBags'
              checkStatus = {formData.options.airBags}
              text='Air Bags'
              change = {() => setFormData(prev => ({
                ...prev,
                options: {
                  ...prev.options,
                  airBags: !prev.options.airBags
                }
            }))}
            />
            <FormCheckbox
              checkboxValue='bluetooth'
              checkStatus = {formData.options.bluetooth}
              text='Bluetooth'
              change = {() => setFormData(prev => ({
                ...prev,
                options: {
                  ...prev.options,
                  bluetooth: !prev.options.bluetooth
                }
            }))}
            />
            <FormCheckbox
              checkboxValue='fogLights'
              checkStatus = {formData.options.fogLights}
              text='Fog Lights'
              change = {() => setFormData(prev => ({
                ...prev,
                options: {
                  ...prev.options,
                  fogLights: !prev.options.fogLights
                }
            }))}
            />
        </Stack>
        </FormControl>

        <FormControl className='mb-3'>
          <FormLabel className='formLabel'>Car Images</FormLabel>
              <p className='imagesInfo'>
                The first image will be the cover (max 6).
              </p>
              <input
                className='formInputFile my-2'
                type='file'
                id='images'
                max='6'
                onChange={changeHandler}
                accept='.jpg,.png,.jpeg'
                multiple
                
              />
        </FormControl>
        
        <Button 
          variant='outline'
          isLoading={buttonLoading}
          loadingText='Adding ..' 
          type='submit' 
          colorScheme='teal' 
          size='lg'
        >
            Submit
        </Button>
          
    </div>
   </form>

   </>
  )
}

export default EditListing