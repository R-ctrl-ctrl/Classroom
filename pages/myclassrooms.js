import { Box, Container, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Classroom from '../components/Classroom'
import { where, query, collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../firebase'
import Navbar from '../components/Navbar'

const myclassrooms = ({ user }) => {
  const [data, setdata] = useState([])
  const [ex, setex] = useState("")


  const loadclassrooms = async () => {

    const citiesRef = collection(db, "classrooms");

    const q = query(citiesRef, where("admin_uid", "==", user.uid))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let d = data
      d.push(doc.data())
      setdata(d)
    });
    setex("Hello derkos")

    console.log(data)
  }

  useEffect(() => {
    if (user) {
      loadclassrooms()
    }
  }, [user])




  return (
    <Box bg="blackAlpha.200">
      <Navbar user={user} />
      <Container minW={"full"} minH="100vh" p={20}>
        <SimpleGrid columns={2} h={"full"} >
          {
            user && data &&
              data.length != 0
              ?
              data.map((d, key) => {
                return (
                  <GridItem colSpan={1} width="80%" align="center" key={key}>
                    <Classroom d={d} />
                  </GridItem>
                )
              })
              :
              <GridItem  colSpan={2}>
                  <Heading textDecoration={"underline"} textAlign={"center"}>You have not created any classroom</Heading>
                </GridItem>
          }
        </SimpleGrid>
      </Container>
    </Box>

  )
}

export default myclassrooms
