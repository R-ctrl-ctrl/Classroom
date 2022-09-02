import { Box, Button, Container, Divider, Flex, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore'



const Discussion = ({ slug }) => {
  const [message, setmessage] = useState("")
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [data, setdata] = useState([])
  const user = auth.currentUser

  const loadmessages = async () => {
    try {
      setdata([])
      const q = query(collection(db, "discussion"), where("classcode", "==", slug), orderBy("order"))
      const querySnapshot = await getDocs(q);
      setdata(querySnapshot.docs.map(docsnap => {
        return {
            ...docsnap.data()
        }
    }))
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }

  }

  useEffect(() => {
    if (slug) {
      loadmessages()
    }
  }, [slug])

  const getOrder = async () => {
    const q = query(collection(db, "discussion"), where("classcode", "==", slug))
    const querySnapshot = await getDocs(q);
    return querySnapshot.size + 1

  }

  const handleSubmit = async () => {
    setLoading(true)
    if (!message) {
      toast({
        title: 'Error',
        description: "Cannot send an empty message",
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
      setLoading(false)
      return
    }

    try {
      const dbRef = collection(db, "discussion");
      const user = auth.currentUser
      const order = await getOrder()
      await addDoc(dbRef, {
        sender: user.displayName,
        classcode: slug,
        message,
        order,
        sender_uid: user.uid
      })
      setLoading(false)
      toast({
        title: 'Success',
        description: "message sent",
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
      await loadmessages()

    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }
    setLoading(false)
    setmessage("")
  }


  return (
    <Box w="full" >
      <Input placeholder='Type message here...' onChange={(e) => setmessage(e.target.value)} value={message} />
      <Button isLoading={loading} onClick={handleSubmit} mt="1vh" colorScheme={"blue"}>Send</Button>
      <Box maxH={"50vh"} overflow="scroll" w="full" border="1px" p={4} borderRadius="10px" bg="blackAlpha.200" mt={"3vh"}>
        {
           data.map((d, key) => {
            return (
              d.sender_uid == user.uid
                ?
                <Flex marginLeft={"auto"}    marginBottom={"1vh"}  justify="flex-end"  >
                  <Text textColor={"white"} fontWeight="semibold" maxW={"60%"}  borderRadius={"10px"} p="2" display={"inline-block"} bg="green"  textAlign="right" >{d.message}</Text>
                
                </Flex>
                :
                <Flex key={key}  marginBottom={"1vh"} align="center"  >
                  <Text marginRight={"8px"}  maxW={"60%"} fontWeight="semibold" borderRadius={"10px"} p="2" display={"inline-block"} bg="blackAlpha.300" >{d.message}</Text>
                  <Text>{d.sender}</Text>
                </Flex>
            )
          })
        }
      </Box>

    </Box>

  )
}

export default Discussion
