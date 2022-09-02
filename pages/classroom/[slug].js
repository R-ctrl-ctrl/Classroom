import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { db } from '../../firebase'
import { getDoc, collection, doc } from 'firebase/firestore'
import Assignments from '../../components/Assignments'
import Discussion from '../../components/Discussion'
const slug = () => {
    const router = useRouter()
    const { slug } = router.query
    const [data, setdata] = useState()

    const loaddata = async () => {

        if (slug != undefined) {
            const docref = doc(db, "classrooms", slug.trim())
            const docsnap = await getDoc(docref)
            setdata(docsnap.data())
        }

    }

    useEffect(() => {
        loaddata()
    }, [slug])


    return (
        <Flex minW={"full"} align="center" direction={"column"} >
            <Flex minW="full" p={4} justify="center">
                <Box w={"80%"} bg="blue.300" borderRadius={"18px"} >
                    {
                        data &&
                        <Flex w="full" h="full">
                            <Flex w="70%" h="full" p={10} justify="center" direction={"column"}>
                                <Text fontSize={"19px"} fontWeight="semibold" marginBottom={"2vh"}>Created_By : {data.admin_name}</Text>
                                <Text fontSize={"19px"} fontWeight="semibold" marginBottom={"2vh"}>Class Name : {data.name}</Text>
                                <Text fontSize={"19px"} fontWeight="semibold" marginBottom={"2vh"}>Subject : {data.subject}</Text>
                                <Text fontSize={"19px"} fontWeight="semibold" marginBottom={"2vh"}>Class Code : {data.classcode}</Text>

                            </Flex>
                            <Flex w="30%" h="full" alignItems={"center"} justify="center">
                                <Image src={data.admin_photo} w="60%" h="70%" borderRadius={"50%"} />
                            </Flex>
                        </Flex>
                    }
                </Box>
            </Flex>


            <Flex  h={"100vh"} w="70%" justifyContent={"center"}>
                <Tabs w="full">
                    <TabList justifyContent={"center"}>
                        <Tab fontSize={"24px"} marginRight="20px">Assignments</Tab>
                        <Tab fontSize={"24px"}>Discussion</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel><Assignments slug={slug}/></TabPanel>
                        <TabPanel><Discussion slug={slug}/></TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    )
}

export default slug

