import { Button, Link, Box, Flex, Container, SimpleGrid, GridItem, Text, Heading } from '@chakra-ui/react'
import { signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import LogoutScreen from '../components/LogoutScreen'
import Navbar from '../components/Navbar'
import { auth, db } from '../firebase'
import Goclass from '../components/Goclass'
import { collection, getDocs, query, where } from 'firebase/firestore'
import Classroom from '../components/Classroom'

export default function Home({ user }) {
  const [disp, setdisp] = useState("none")
  const [data, setdata] = useState([])

  const loadclassrooms = async () => {
    const docref = collection(db, "joinusers");
    const q = query(docref, where("user_uid", "==", user.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (doc) => {
      let code = doc.data().classcode


      // searching in classrooms collection
      const newref = collection(db, "classrooms");
      const que = query(newref, where("classcode", "==", code.trim()))
      const queSnapshot = await getDocs(que)
      setdata([])
      queSnapshot.forEach((docsnap) => {
        // let da = data
        // da.push(docsnap.data())
        // setdata(da)
        setdata(data => [...data, docsnap.data()])
      })
    });
  }

  useEffect(() => {
    if (user) {
      loadclassrooms()
    }
  }, [])



  const getdisplay = (d) => {
    setdisp(d)
  }

  const getcode = (c) => {
    setdisp(c)
  }

  const logoutbtn = async () => {
    await signOut(auth)
  }
  return (
    <div>
      {
        user
          ?
          <Box bg="blackAlpha.200">
            <Navbar bg="blue" user={user} onsubmit={getdisplay} />
            <Box style={{ display: disp }}>
              <Goclass getcode={getcode} />
            </Box>

          </Box>
          :
          <div>
            <LogoutScreen />
          </div>
      }


      {
        <Container bg="blackAlpha.200" minW={"full"} minH="100vh" p={20}>
          <SimpleGrid columns={2} h={"full"} >
            {
              data && user &&
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
                  <Heading textDecoration={"underline"} textAlign={"center"}>You have not joined any classroom</Heading>
                </GridItem>
            }
          </SimpleGrid>
        </Container>
      }


    </div>
  )
}
