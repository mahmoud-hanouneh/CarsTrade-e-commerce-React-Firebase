import React, { useEffect, useState } from 'react'
import { Stack, Box, Button, HStack, VStack, Avatar } from '@chakra-ui/react'
import MenuItem from './MenuItem'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import UserProfile from './UserProfile'
import useAuthentication from '../../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'
 

const MenuLinks = ({ isOpen }) => {

  const { isLogged } = useAuthentication()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(isLogged)
  }, [navigate])
  
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
        {!isLogged && 
         <MenuItem to='sign-in'>
            <Button variant='outline' colorScheme='orange' size='md'>
                Sign In
            </Button>
        </MenuItem>
        }
       
        {!isLogged && 
            <MenuItem to='sign-up'>
              <Button colorScheme='orange' size='md'>
                  Sign Up
              </Button>
            </MenuItem>
        }


        {isLogged && <UserProfile />}
        
      </Stack>
    </Box>

  )
}

export default MenuLinks