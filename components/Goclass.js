import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { db, auth } from '../firebase'
import { doc, getDoc, collection, addDoc } from 'firebase/firestore'

const Goclass = ({ getcode }) => {
    const [code, setcode] = useState("")
    const toast = useToast()
    const [loading, setloading] = useState(false)
    const handleClick = async () => {
        setloading(true)
        if (!code) {
            toast({
                title: 'Error',
                description: "Please Enter code",
                status: 'warning',
                duration: 7000,
                isClosable: true,
            })
            setloading(false)
            return;
        }

        const docRef = doc(db, "classrooms", code.trim());
        const docSnap = await getDoc(docRef);
        if (docSnap.data() == undefined) {
            toast({
                title: 'Error',
                description: "Invalid Classcode",
                status: 'error',
                duration: 7000,
                isClosable: true,
            })
            setloading(false)
            return;
        }



        try {
            const user = auth.currentUser

            if (docSnap.data().admin_uid == user.uid) {
                toast({
                    title: 'Error',
                    description: "You can't join your own class",
                    status: 'error',
                    duration: 7000,
                    isClosable: true,
                })
                setloading(false)
                return;
            }



            const docRef = await addDoc(collection(db, "joinusers"), {
                classcode: code,
                user_uid: user.uid,
            });
            toast({
                title: 'Success',
                description: 'classroom joined successfully',
                status: 'success',
                duration: 7000,
                isClosable: true,
            })

        } catch (err) {
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 7000,
                isClosable: true,
            })
            setloading(false)
            return
        }



        setloading(false)
        getcode("none")
    }

    const handlecancel = () => {
        getcode("none")
    }
    return (
        <Flex w="full" justify="flex-end" p={10}>
            <Flex w="35%" flexDirection={"column"} align="center" rowGap={"2vh"}  >
                <Input placeholder='Enter classcode' onChange={(e) => setcode(e.target.value)} />
                <Flex w="full" justifyContent={"space-around"}>
                    <Button isLoading={loading} onClick={handleClick} bg="blue.600" color={"white"} w="40%">Submit</Button>
                    <Button onClick={handlecancel} bg="blue.600" color={"white"} w="40%">Cancel</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Goclass
