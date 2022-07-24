import {useEffect, useState} from 'react'
import {
    IconButton, Avatar, Box, Flex, HStack, VStack, Text, Menu, MenuButton, MenuDivider,
    MenuItem, MenuList,
} from "@chakra-ui/react";

import { FiChevronDown, FiBell } from "react-icons/fi";
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const auth = getAuth()
  const nav = useNavigate()

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
                    src={
                      "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="lg" color='gray.600'>{auth.currentUser.displayName}</Text>
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