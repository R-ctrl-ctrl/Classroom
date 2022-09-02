import { Box, Button, Container, Flex, Heading, HStack, Link, VStack } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'

const LogoutScreen = () => {
  return (
    <Box minW="full" h={"100vh"} maxH="100vh"  bg={"blackAlpha.800"} overflow={"hidden"}>
        <Navbar/>
        <Flex w={"full"} h="90%"  align={"center"} justify="center">
            <VStack w="70%" rowGap={"5vh"}>
                    <Heading fontSize={"60px"} color="white">Welcome To Classroom</Heading>
                    <HStack  w="50%"  justify={"space-around"}>
                        <Button w={"40%"} colorScheme='blue'><Link w="full" href='/login'>Login</Link></Button>
                        <Button w={"40%"} colorScheme='green'><Link w="full" href='/signup'>SignUp</Link></Button>
                    </HStack>
            </VStack>

        </Flex>
    </Box>
  )
}

export default LogoutScreen
