import { Button, Container, Flex, FormControl, FormLabel, GridItem, Heading, Input, SimpleGrid, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage } from '../firebase'
import { useRouter } from 'next/router'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4  } from 'uuid';




const signup = () => {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [pic, setPic] = useState()
    const toast = useToast()
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        if (!fname || !lname || !password || !confirmpassword || !email) {
            toast({
                title: 'Error',
                description: "Please Enter all fields",
                status: 'warning',
                duration: 7000,
                isClosable: true,
            })
            setLoading(false)
            return;
        }

        if (password != confirmpassword) {
            toast({
                title: 'Error',
                description: "password mismatch",
                status: 'warning',
                duration: 7000,
                isClosable: true,
            })
            setLoading(false)
            return;
        }

        try{
            await createUserWithEmailAndPassword(auth, email, password)

        const dname = fname + " " + lname

        const user = auth.currentUser
        const imgname = pic.name + v4()
        
        const imageref = ref(storage, `images/${imgname}`)
        await uploadBytes(imageref, pic)

        const link = await getDownloadURL(imageref)

        
        
        await updateProfile(user, {
            displayName: dname,
            photoURL:link
        })
        console.log(user.displayName)
        setLoading(false)

        router.push('/')

        }catch(err){
            console.log(err.message)
            setLoading(false)
        }

        

    }


    return (
        <Container minW="full" h="100vh" bg={"blackAlpha.800"}>
            <Flex direction="column" w="full" h={"full"} justify="center" align={"center"}>
                <VStack bg={"white"} w="40%" p={10} borderRadius={12}>

                    <Heading marginBottom={10}>SignUp Form</Heading>
                    <SimpleGrid columns={2} columnGap={10} rowGap={5} >
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>
                                    First Name
                                </FormLabel>
                                <Input type={"text"} placeholder={"Enter First name"} onChange={(e) => setfname(e.target.value)} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormControl>
                                <FormLabel>
                                    Second Name
                                </FormLabel>
                                <Input type={"text"} placeholder={"Enter Second name"} onChange={(e) => setlname(e.target.value)} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <Input type={"email"} placeholder={"Enter email"} onChange={(e) => setemail(e.target.value)} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <Input type={"password"} placeholder={"Enter password"} onChange={(e) => setpassword(e.target.value)} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel>
                                    Confirm Password
                                </FormLabel>
                                <Input type={"password"} placeholder={"Enter password again"} onChange={(e) => setconfirmpassword(e.target.value)} />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={2}>

                            <FormLabel>
                                Add Profile Picture
                            </FormLabel>
                            <Input type={"file"} onChange={(e) => setPic(e.target.files[0])} />

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

export default signup
