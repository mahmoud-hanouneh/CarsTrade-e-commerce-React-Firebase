import React, {useEffect, useContext } from 'react'
import UserContext from '../../contexts/user/UserContext';
import {
    Avatar, Box, Flex, HStack, VStack, Text, Menu, MenuButton, MenuDivider,
    MenuItem, MenuList,
} from "@chakra-ui/react";

import { FiChevronDown } from "react-icons/fi";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const auth = getAuth()
  const nav = useNavigate()

  const { displayName, dispatch } = useContext(UserContext)
  useEffect(() => {
    
      onAuthStateChanged(auth, (user) => {
        if(user) {
          dispatch({ type: 'SET_USER', payload: user.displayName })
        }
      })
    
  },[])

  const signOutHandler = () => {
    auth.signOut()
    nav('/sign-in')
  }
    return (
      <>
        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems="center">
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack spacing="4">
                  <Avatar
                    size="md"
                    name={displayName}
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="lg" color='gray.600'>{displayName}</Text>
                    <Text fontSize="md" color="gray.600">
                      Member
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList fontSize="md" bg="white" borderColor="gray.200">
                <MenuItem color='black' onClick={() => nav('/profile')}>Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => signOutHandler()} color='black'>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </>
    )
  
}

export default UserProfile