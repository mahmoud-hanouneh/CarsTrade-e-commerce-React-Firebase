import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Heading,
  Image
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import MainLogo from '../images/main-icon.png'

export default function Footer() {
  return (
    <footer style={{marginTop: '170px'}}>
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
       
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
        <Stack spacing={6}>
            <Box>
              <Image src={MainLogo} />
            </Box>
            <Text fontSize={'sm'}>
              © 2022 CarsTrade. All rights reserved
            </Text>
            <Stack direction={'row'} spacing={6}>
                <FaTwitter />
                <FaYoutube />
                <FaInstagram />
            </Stack>
        </Stack>
           <Box>
                <Heading as='h5' size='sm' mb={8}>Support</Heading>
                <Stack align={'flex-start'}>
                    <Link href={'#'}>About Us</Link>
                    <Link href={'#'}>Report A Fake Advertisment</Link>
                    <Link href={'#'}>Contact Us</Link>
                </Stack>
           </Box>   
     
          <Box>
                <Heading as='h5' size='sm' mb={8}>CarsTrade</Heading>
                <Stack align={'flex-start'}>
                    <Link href={'#'}>Add An Ad</Link>
                    <Link href={'#'}>Profile</Link>
                    <Link href={'#'}>Home</Link>
                </Stack>
          </Box>
          <Box>
                <Heading as='h5' size='sm' mb={8}>About Me</Heading>
          </Box>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>

        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'center' }}
          align={{ md: 'center' }}>
          <Text>© 2022 CarsTrade. All rights reserved. By <span style={{color: 'orange.700', fontWeight: 'bold'}}>
              <a href='#'>Mahmoud Hanouneh</a>
          </span></Text>
          <Stack direction={'row'} spacing={6}>
           
          </Stack>
        </Container>
      </Box>
    </Box>
    </footer>  

  );
}