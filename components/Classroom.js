import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'




const Classroom = ({ d }) => {

    return (
        <Box borderRadius={"14px"} background={"blackAlpha.400"} w="95%" height={"35vh"} p={6}>
            <Flex h="full" w="full" >
                <Flex w={"100%"} justify="center" align={"flex-start"} direction={"column"} rowGap="10%">
                    <Text align={"flex-start"} fontSize={"20px"} fontWeight="bold">Name : {d.name}</Text>
                    <Text fontSize={"18px"} fontWeight="bold">Subject : {d.subject}</Text>
                    <Text fontSize={"18px"} fontWeight="bold">Classcode : {d.classcode}</Text>
                    <Button colorScheme={"blue"} w="70%"><Link w="full" fontSize={"20px"} textDecoration="none" href={'classroom/'+ d.classcode}><Text textDecoration={"none"}>Watch</Text></Link></Button>
                </Flex>
                <Flex w="40%" h="full" alignItems={"center"} justifyContent="center">
                    <Image w="90%" h="65%" src={d.admin_photo} borderRadius="50%" />
                </Flex>
            </Flex>

        </Box>


    )
}

export default Classroom
