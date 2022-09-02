import { Box, Container, Flex, Image, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { PhoneIcon, AddIcon, WarningIcon, EmailIcon } from '@chakra-ui/icons'



const profile = ({ user }) => {
    const [img, setimg] = useState("")

    return (
        <Box minW={"full"} h="100vh" bg={"blue.200"} overflow="hidden" justify="center">
            <Navbar user={user} />
            <Container minW="full" h="100vh" overflow="hidden" marginTop="5vh">
                <Flex w="full" h={"80%"} justify="space-around" p={15} bg={"white"}>
                    <Container minW={"65%"} h="full" >
                        {
                            user && <Image minW={"full"} h="full" alt={user.displayName.toUpperCase()} src={user.photoURL} />
                        }
                    </Container>

                    <Box minW={"25%"} h="full" align='center'  >
                        {
                            user &&
                            <VStack w="80%"  align="center" h='full' justify={"center"} >
                                <Text fontSize={"50px"} letterSpacing='2px' fontWeight='bold'>Name : {user.displayName}</Text>
                                <Text fontSize={'24px'}><EmailIcon h="full" w="6"/> {user.email}</Text>
                            </VStack>
                        }
                    </Box>


                </Flex>
            </Container>

        </Box>

        // <div>
        //     {
        //         user 
        //         ?
        //         <h2>
        //             Present
        //             {user.displayName}
        //         </h2>
        //         :
        //         <h2>
        //             Absent
        //         </h2>
        //     }
        // </div>


    )
}

export default profile
