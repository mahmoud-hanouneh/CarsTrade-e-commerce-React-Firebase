import React from 'react'
import { Stack, Button } from '@chakra-ui/react'
import MenuItem from './MenuItem' 

const LogLinks = () => {
  return (
    <Stack 
      spacing={3}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
    >
      <MenuItem to='sign-in'>
            <Button variant='outline' colorScheme='orange' size='md'>
                Sign In
            </Button>
      </MenuItem>

      <MenuItem to='sign-up'>
          <Button colorScheme='orange' size='md'>
              Sign Up
          </Button>
      </MenuItem>
   </Stack> 
  )
}

export default LogLinks