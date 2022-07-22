import { Spinner } from '@chakra-ui/react'

const SpinnerComponent = () => {
  return (
    <div className="flex justify-center	justify-items-center items-center">
      <Spinner
         
          thickness='4px'
          speed='0.50s'
          emptyColor='gray.200'
          color='orange.500'
          size='xl'
        />
    </div>
  
  )
}

export default SpinnerComponent