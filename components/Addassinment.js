import { Box, Button, Flex, GridItem, Image, Input, Link, SimpleGrid, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { storage, db } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid';
import { setDoc, doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
let fileicon = require('../public/fileicon.png')


const Addassinment = ({ onSubmit, slug }) => {
  const [file, setfile] = useState()
  const [uploadLoading, setuploadLoading] = useState(false)
  const [name, setname] = useState("")
  const toast = useToast()
  const [loading, setloading] = useState(false)
  const [documents, setdocuments] = useState()
  const [createdisabled,setcreatedisabled] = useState(false)



  const handleclick = async () => {
    setloading(true)
    if (!name) {
      toast({
        title: 'Error',
        description: 'Assignment must have a name!',
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
      setloading(false)
      return
    }
    try {
      let order = await getorder()
      let str = slug + order.toString()
      const docRef = doc(db, "assignments", str);
      await updateDoc(docRef, {
        name: name
      });

      toast({
        title: 'Success',
        description: 'Assignment created successfully!',
        status: 'success',
        duration: 7000,
        isClosable: true,
      })

      onSubmit("none")

    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
      loading(false)
    }
  }

  const getorder = async () => {
    const docref = collection(db, "assignments")
    const q = query(docref, where("classcode", "==", slug));
    const docsnap = await getDocs(q)
    let i = 0;
    docsnap.forEach((doc) => {
      i++;
    })
    return i - 1;
  }

  const uploadHandler = async () => {
    setuploadLoading(true)
    setcreatedisabled(true)
    try {
      const filename = file.name + v4()
      const fileref = ref(storage, `files/${filename}`)
      await uploadBytes(fileref, file)
      const link = await getDownloadURL(fileref)

      let order = await getorder()
      let str = slug + order.toString()
      const docRef = doc(db, "assignments", str);
      const docSnap = await getDoc(docRef);
      let f = docSnap.data().files
      f.push(file.name)
      let u = docSnap.data().fileurls
      u.push(link)
      await updateDoc(docRef, {
        files: f,
        fileurls: u
      });

      setfile("")


      toast({
        title: 'Success',
        description: "File Uploaded",
        status: 'success',
        duration: 7000,
        isClosable: true,
      })

      setuploadLoading(false)
      await loadfiles()
      setcreatedisabled(false)
    }
    catch (err) {
      toast({
        title: 'Account created.',
        description: err.message,
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
      setuploadLoading(false)
    }
  }

  const loadfiles = async () => {
    let order = await getorder()
    let str = slug + order.toString()
    const docRef = doc(db, "assignments",str);
    const docSnap = await getDoc(docRef);
    setdocuments(docSnap.data())
    console.log("yess")
    console.log(documents)
  }





  return (
    <Box border={"1px"} p="4" borderRadius={"15px"} bg={"blackAlpha.200"}>
      <Input bg="white" placeholder='Name of assignment...' mb={"1vh"} onChange={(e) => setname(e.target.value)} />
      <Input bg="white" mt={"1vh"} type={"file"} onChange={(e) => setfile(e.target.files[0])} mb="1vh" />
      <Flex w="40%" justify={"space-around"}>
        <Button isLoading={uploadLoading} colorScheme='blue' onClick={uploadHandler}>Upload</Button>
        <Button isLoading={loading} colorScheme='blue' isDisabled={createdisabled} onClick={handleclick}>Create</Button>
      </Flex>

      <Flex w="full" justify={"space-around"} marginTop="4vh"  >
        <SimpleGrid w={"full"} columns={2} rowGap="3vh">
          {documents &&

            documents.files.map((d, i) => {
              return (
                <GridItem bg="white" w="90%" border={"1px"} p={2} colSpan={1} key={i} cursor="pointer" borderRadius={"20px"}>
                  <Link  href={documents.fileurls[i]} target="_blank">
                    <Flex  height={"10vh"} alignItems="center" >
                      <Image height={"90%"} width={"30%"} src={"https://static.vecteezy.com/system/resources/previews/000/425/730/original/vector-document-in-folder-icon.jpg"} />
                      <Text fontSize={"20px"} fontWeight="semibold">{documents.files[i]}</Text>
                    </Flex>
                  </Link>
                </GridItem>
              )
            })
          }
        </SimpleGrid>
      </Flex>
    </Box>
  )
}

export default Addassinment
