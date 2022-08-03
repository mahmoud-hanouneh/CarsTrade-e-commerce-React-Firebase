import React, { useEffect, useState } from 'react'
import { Stack, Box, Button } from '@chakra-ui/react'
import MenuItem from './MenuItem'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import UserProfile from './UserProfile'
import { onAuthStateChanged, getAuth } from 'firebase/auth' 


const MenuLinks = ({ isOpen }) => {
  
  const [loginState, setLoginState] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginState(true)
      } else {
        setLoginState(false)
      }
    })
  }, [])

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
           <AiOutlineAppstoreAdd color='orange' size='1.7rem' />
        </MenuItem>
        {!loginState && 
         <MenuItem to='sign-in'>
            <Button variant='outline' colorScheme='orange' size='md'>
                Sign In
            </Button>
        </MenuItem>
        }
       
        {!loginState && 
            <MenuItem to='sign-up'>
              <Button colorScheme='orange' size='md'>
                  Sign Up
              </Button>
            </MenuItem>
        }


        {loginState && (<UserProfile />)}
        
      </Stack>
    </Box>

  )
}

export default MenuLinks