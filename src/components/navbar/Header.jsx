import { useState } from 'react'
import MenuToggle from './MenuToggle'
import NavbarContainer from './NavbarContainer'
import Logo from './Logo'
import MenuLinks from './MenuLinks'


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(prev => !prev)
  return (
    <>
        <NavbarContainer {...props}>
          <Logo
            w="100px"
            color={["white", "white", "primary.500", "primary.500"]}
          />
          <MenuToggle isOpen={isOpen} toggle={toggle} />
            <MenuLinks isOpen={isOpen} />
          
        </NavbarContainer>
    
    </>
  )
}

export default Header