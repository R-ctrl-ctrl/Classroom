import React, { useState } from 'react'
import { collection, addDoc, setDoc,doc } from 'firebase/firestore'
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { db, auth } from '../firebase'
import { useRouter } from 'next/router'




const createclassroom = () => {
  const [subject, setSubject] = useState("")
  const [classroom, setClassroom] = useState("")
  const router = useRouter()

  const toast = useToast()
  const handleSubmit = async () => {
    if (!subject || !classroom) {
      toast({
        title: 'Error',
        description: "All fields Needed",
        status: 'warning',
        duration: 7000,
        isClosable: true,
      })
      return;
    }


    try {
      const user = auth.currentUser
      // const docRef = await addDoc(collection(db, "classrooms"), {
      //   name:classroom,
      //   subject,
      //   admin_uid:user.uid,
      //   admin_photo:user.photoURL,
      //   admin_name:user.displayName ,
      //   classcode : docRef.id    
      // });

      const newDocRef = doc(collection(db, "classrooms"));
      await setDoc(
        newDocRef,
        {
          name: classroom,
          subject,
          admin_uid: user.uid,
          admin_photo: user.photoURL,
          admin_name: user.displayName,
          classcode: newDocRef.id
        }
      )


      router.push('/')
      toast({
        title: 'Error',
        description: 'Classroom Created',
        status: 'success',
        duration: 7000,
        isClosable: true,
      })

    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'warning',
        duration: 7000,
        isClosable: true,
      })
      return;
    }
  }



  return (
    <Container minW={"full"} minH={"100vh"} bg="blackAlpha.300" >
      <Flex direction={"column"} rowGap="3vh" align='center' minH="100vh" justifyContent={'center'} >
        <FormControl w="50%" >
          <FormLabel>Classroom name:</FormLabel>
          <Input placeholder='Enter classroom name' onChange={(e) => setClassroom(e.target.value)} outline={"none"} borderColor="black" borderWidth="2px" />
        </FormControl>
        <FormControl w="50%">
          <FormLabel>Subject name:</FormLabel>
          <Input placeholder='Enter subject name' onChange={(e) => setSubject(e.target.value)} borderColor="black" borderWidth="2px" />
        </FormControl>
        <Button colorScheme={"blue"} marginTop="2vh" onClick={handleSubmit}>Create</Button>
      </Flex>
    </Container>
  )
}

export default createclassroom
