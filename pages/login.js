import React, { useState } from 'react'
import { Button, Container, Flex, FormControl, FormLabel, GridItem, Heading, Input, SimpleGrid, useToast, VStack } from '@chakra-ui/react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebase'
import {useRouter} from 'next/router'

const login = () => {

    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [loading,setloading] = useState(false)
    const toast = useToast()
    const router = useRouter()

    const handleSubmit = async()=>{
        setloading(true)
        if(!email || !password){
            toast({
                title: 'Error',
                description: "Please Enter all fields",
                status: 'warning',
                duration: 7000,
                isClosable: true,
              })
              loading(false)
            return;
            }


        try{
                await signInWithEmailAndPassword(auth,email,password)
                router.push('/')
        }catch(err){
            toast({
                title: 'Error',
                description: err.message,
                status: 'warning',
                duration: 7000,
                isClosable: true,
              })
        }

    }
  return (
    <Container minW="full" h="100vh" bg={"blue.300"}>
        <Flex direction="column"  w="full" h={"full"} justify="center" align={"center"}>
            <VStack bg={"white"} w="40%" p={10} borderRadius={12}>
                
                <Heading marginBottom={10}>Login Form</Heading>
                <SimpleGrid columns={2}  rowGap={5} w='full' >
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <Input type={"email"} placeholder={"Enter email"} onChange={(e)=>setemail(e.target.value)}/>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <Input type={"password"} placeholder={"Enter password"} onChange={(e)=>setpassword(e.target.value)}/>
                        </FormControl>
                    </GridItem>
                    
                    <GridItem colSpan={2}  >
                        <Button isLoading={loading} w="full" colorScheme={"blue"} onClick={handleSubmit}>Submit</Button>
                    </GridItem>
                    
                </SimpleGrid>
            </VStack>

        </Flex>
    </Container>
  )
}

export default login
