import React, { useEffect, useState } from 'react'
import { Stack, Box, Button, HStack, VStack, Avatar } from '@chakra-ui/react'
import MenuItem from './MenuItem'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import UserProfile from './UserProfile'
import useAuthentication from '../../hooks/useAuthentication'



const MenuLinks = ({ isOpen }) => {

  const [logState, setLogState] = useState(null)
  const {isLogged} = useAuthentication()

  useEffect(() => {
    setLogState(isLogged)
  }, [isLogged])
  
  return (
    <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/category/sale">Sale</MenuItem>
        <MenuItem to="/category/rent">Rent</MenuItem>
        <MenuItem to="/profile">Profile</MenuItem>
        <MenuItem to="/create-listing">
           <AiOutlineAppstoreAdd size='1.2rem' />
        </MenuItem>
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

        {logState && <UserProfile />}
        
      </Stack>
    </Box>

  )
}

export default MenuLinks