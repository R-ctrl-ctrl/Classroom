import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Box, Button, Flex, GridItem, Image, Input, Link, SimpleGrid, Text, useToast, Heading } from '@chakra-ui/react'

const pid = () => {
    const router = useRouter()
    const { pid } = router.query
    const [documents, setdocuments] = useState()

    const loadfiles = async () => {
        const docRef = doc(db, "assignments", pid.trim());
        const docSnap = await getDoc(docRef);
        setdocuments(docSnap.data())
    }

    useEffect(() => {
        if (pid) {
            loadfiles()
        }
    }, [pid])

    return (
            <Flex w="full" align={"space-around"} justify="center" marginTop="4vh" >

                <SimpleGrid w={"80%"} align="center" justify="center" columns={2} rowGap="3vh" columnGap={"5%"}>
                   <GridItem colSpan={2}>
                        <Heading>Assignment name : {documents &&  documents.name}</Heading>
                   </GridItem>
                   
                    {documents &&

                        documents.files.map((d, i) => {
                            return (
                                <GridItem bg="white" border={"1px"} p={2} colSpan={1} key={i} cursor="pointer" borderRadius={"20px"}>
                                    <Link href={documents.fileurls[i]} target="_blank">
                                        <Flex height={"10vh"} alignItems="center" >
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


    )
}

export default pid
