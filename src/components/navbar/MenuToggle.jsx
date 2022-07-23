import React from 'react'
import { Box } from '@chakra-ui/react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{base: 'block', md: 'none'}} onClick={toggle}>
        {isOpen ? <AiOutlineClose color='black' /> : <AiOutlineMenu color='black' />}
    </Box>
  )
}

export default MenuToggle