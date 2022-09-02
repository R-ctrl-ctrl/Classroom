import { Box, Button, Container, Flex, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import {auth} from '../firebase'
import {signOut} from 'firebase/auth'
import Router, { useRouter } from 'next/router'

const Navbar = ({ user,onsubmit }) => {
    const router = useRouter()
    const handlejoin = ()=>{
        onsubmit("block")
    }

    const logoutbtn = async()=>{
        await signOut(auth)
        router.push('/')
    }

    return (
        <Flex minW={"full"} h={"3vh"}  p={"10"} justifyContent='end' >
            {
                user
                    ?
                    <Flex h="full" w={"45%"} align="center" justify={"space-around"}  >
                        <Box color={"black"} cursor="pointer" fontSize={"21px"} fontWeight="bold"><Link href='/createclassroom'>Create</Link></Box>
                        <Box color={"black"} cursor="pointer" fontSize={"21px"} fontWeight="bold"><Link href='/myclassrooms'>My Classrooms</Link></Box>
                        <Box color={"black"} cursor="pointer" fontSize={"21px"} fontWeight="bold"><p onClick={handlejoin}>Join</p></Box>
                        <Box color={"black"} cursor="pointer" fontSize={"21px"} fontWeight="bold"><Link href='/profile'>Profile</Link></Box>
                        <Button bg="red" textColor={"white"} onClick={logoutbtn}>Logout</Button>
                    </Flex>
                    :
                    <Flex h="full" w={"45%"} align="center" justify={"space-around"} >
                        <Box color={"white"} cursor="pointer" fontSize={"24px"} fontWeight="bold">Home</Box>
                        <Box color={"white"} cursor="pointer" fontSize={"24px"} fontWeight="bold"><Link href='/login'>Login</Link></Box>
                        <Box color={"white"} cursor="pointer" fontSize={"24px"} fontWeight="bold"><Link href='/signup'>Signup</Link></Box>
                    </Flex>
            }

        </Flex>
    )
}

export default Navbar
