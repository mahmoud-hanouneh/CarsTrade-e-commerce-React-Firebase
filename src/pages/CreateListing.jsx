import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Spinner from '../components/Spinner'
import RadioInput from '../components/RadioInput'
import {
  Button,
  FormControl,
  FormLabel,
  Switch,
  Input,
  NumberInput,
  Textarea,
  Text,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Heading,
  Radio,
  RadioGroup,
  useRadioGroup,
  CheckboxGroup,
  Checkbox,
  useCheckboxGroup,
  Stack,
  HStack
} from '@chakra-ui/react'

import { carsData } from '../carsData';
import { cities } from '../citiesData';
import { colorsData } from '../colorsData'

const CreateListing = () => {
  const options = ['Manual', 'Automatic']
  const { getRootProps, getRadioProps} = useRadioGroup({
    name: 'framework',
    defaultValue: 'Automatic'
  })

  const group = getRootProps()
  
  const isMounted = useRef(true)
  const auth = getAuth()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true) 

  const [formData, setFormData] = useState({
    type: 'sale',
    manufacturer: '',
    offer: true,
    transmission: 'Automatic',
    modelYear: '2022',
    color: '',
    location: '',
    city: '',
    taxiOrPrivate: '',
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
        fogLights: false,
      }
    ,
    userRef: ''
  })
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
                setLoading(false)
            } else {
                navigate('/sign-in')
            }
        })
    }

    return () => {
        isMounted.current = false
    }

  }, [isMounted])
  
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
          setLoading(false)
          alert(error)
          return
      })
      
      const formDataCopy = {
          ...formData,
          carImages,
          timpestamp: serverTimestamp()
      }
      delete formDataCopy.images

      const docRef = await addDoc(collection(db, 'cars'), formDataCopy)
      console.log('success')
      setLoading(false)
      // navigate(`/category/${formDataCopy.type}/${docRef.id}`)

    } catch (error) {
      console.log(error.code)
    }
    
  }
  
 

  if (loading) {
      return <Spinner />
  }
  return (
   <>
   <form onSubmit={submitHandler}>
    <div className="container w-9/12 mx-auto p-4">
        <Heading className='my-2'>Add your car ad</Heading>
        <FormControl className='mb-3'>
          <FormLabel htmlFor='manufacturer'>Manufacturer</FormLabel>
          <Select 
            id='manufacturer' 
            placeholder='Select country'
            onChange={changeHandler}
            value={formData.manufacturer}
          >
          {carsData.map((car) => (
            <option key={car.id} value={car.brand}>{car.brand}</option>
          ))}
        </Select>
        
        </FormControl>

        <FormControl className='mb-3'>
          <FormLabel htmlFor='color'>Color</FormLabel>
          <Select 
            id='color' 
            placeholder='Select color'
            onChange={changeHandler}
            value={formData.color}
          >
          {colorsData.map((color) => (
            <option key={color.id} value={color.color}>{color.color}</option>
          ))}
        </Select>
        
        </FormControl> 

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

        <FormControl className='mb-3'>
          <FormLabel htmlFor='modelYear'>Year</FormLabel>
            <NumberInput 
              max={2022} 
              min={1920} 
              onChange={(valueString) => setFormData(prev => ({
                ...prev,
                modelYear: valueString
              }))} 
              value={formData.modelYear}
            >
              <NumberInputField id='modelYear' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
        </FormControl>
        
        <FormControl className='mb-3'>
          <FormLabel htmlFor='mileage'>Mileage</FormLabel>
            <NumberInput
              min={0} 
              onChange={(valueString) => setFormData(prev => ({
                ...prev,
                mileage: valueString
              }))} 
              value={formData.mileage}
            >
              <NumberInputField id='mileage' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
        </FormControl>

        <FormControl className='mb-3'>
          <HStack onChange={(value) => setFormData(prev => ({
            ...prev,
            transmission: value.target.defaultValue
          }))} 
          {...group}>
          {options.map((value) => {
            const radio = getRadioProps({ value })
            return (
              <RadioInput key={value} {...radio}>
                {value}
              </RadioInput>
            )
          })}
          </HStack>
        </FormControl>

        <FormControl className='mb-3'>
          <FormLabel htmlFor='price' mb='0'>
            Price
          </FormLabel>
          <NumberInput
              min={0} 
              onChange={(value) => setFormData(prev => ({
                ...prev,
                price: parse(value)
              }))} 
              value={format(formData.price)}
            >
              <NumberInputField id='price' />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
        </FormControl>

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
              
        <FormControl className='mb-3'>
          <FormLabel htmlFor='city'>City</FormLabel>
          <Select 
            id='city' 
            placeholder='Select country'
            onChange={changeHandler}
            value={formData.city}
          >
          {cities.map((city) => (
            <option key={city.id} value={city.city}>{city.city}</option>
          ))}
        </Select>
        
        </FormControl>      
        
        <FormControl className='mb-3'>
          <FormLabel htmlFor='location'>Location (ex. neighborhood)</FormLabel>
          <Input 
            value={formData.location} 
            onChange={changeHandler} 
            id='location' 
            type='text' 
          />
        </FormControl> 
        
        <FormControl className='mb-3'>
          <FormLabel htmlFor='notes'>Notes</FormLabel>
          <Textarea
            id='notes'
            value={formData.notes}
            onChange={changeHandler}
            placeholder='Notes'
            size='sm'
          />
        </FormControl>

        <FormControl className='mb-3'>
          <FormLabel htmlFor='options'>Options</FormLabel>
          <Stack id='options' spacing={5} direction='row'>
            <Checkbox 
              value='leatherSeats' 
              size='lg' 
              colorScheme='teal' 
              isChecked={formData.options.leatherSeats} 
              onChange={() => setFormData(prev => ({
                ...prev,
                options: {
                  ...prev.options,
                  leatherSeats: !prev.options.leatherSeats
                }
            }))}>
              Leather Seats
            </Checkbox>
            <Checkbox 
              value='airBags' 
              size='lg' 
              colorScheme='teal' 
              isChecked={formData.options.airBags} 
              onChange={() => setFormData(prev => ({
                ...prev,
                options: {
                  ...prev.options,
                  airBags: !prev.options.airBags
                }
            }))}>
              Air Bags
            </Checkbox>

            <Checkbox 
              value='bluetooth' 
              size='lg' 
              colorScheme='teal' 
              isChecked={formData.options.bluetooth} 
              onChange={() => setFormData(prev => ({
                ...prev,
                options: {
                  ...prev.options,
                  bluetooth: !prev.options.bluetooth
                }
            }))}>
            Bluetooth
            </Checkbox>

            <Checkbox 
              value='fogLights' 
              size='lg' 
              colorScheme='teal' 
              isChecked={formData.options.fogLights} 
              onChange={() => setFormData(prev => ({
                ...prev,
                options: {
                  ...prev.options,
                  fogLights: !prev.options.fogLights
                }
            }))}>
            Fog Lights
            </Checkbox>
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
                required
              />
        </FormControl>
        
        <Button variant='outline' type='submit' colorScheme='teal' size='lg'>
            Submit
        </Button>
          
    </div>
   </form>

   </>
  )
}

export default CreateListing