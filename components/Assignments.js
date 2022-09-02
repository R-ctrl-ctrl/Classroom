import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import Addassinment from './Addassinment'
import { collection, setDoc, doc, query, getDocs, where, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase'

import DisplayAssignments from './DisplayAssignments';


const Assignments = ({ slug }) => {
  const [disp, setdisp] = useState("none")
  const [isOwner, setisOwner] = useState(false)
  const [disabled, setdisabled] = useState(false)

  const getorder = async () => {
    const docref = collection(db, "assignments")
    const q = query(docref, where("classcode", "==", slug));
    const docsnap = await getDocs(q)
    let i = 0;
    docsnap.forEach((doc) => {
      i++;
    })
    return i;
  }

  const handleClick = async () => {
    setdisp("block")
    setdisabled(true)
    let order = await getorder()
    let str = slug + order.toString()
    await setDoc(doc(db, "assignments", str), {
      name: "",
      files: [],
      fileurls: [],
      classcode: slug
    });
  }

  const createclick = (str) => {
    setdisp(str)
    setdisabled(false)
  }


  const checkOwner = async () => {
    const docRef = doc(db, "classrooms", slug);
    const docSnap = await getDoc(docRef);
    if (auth.currentUser.uid == docSnap.data().admin_uid) {
      setisOwner(true)
    }
  }

  useEffect(() => {
    if (slug) {
      checkOwner()
    }
  }, [slug])



  return (
    <div>
      {
        isOwner &&
        <Button bg={"blue.600"} onClick={handleClick} isDisabled={disabled} >Add Assignments</Button>
      }
      <Box marginTop={"2vh"}>
        {
          disp == "block"
            ?
            <Addassinment onSubmit={createclick} slug={slug} />
            :
            <Box></Box>
        }
        <DisplayAssignments slug={slug}  />
      
      </Box>
    </div>
  )
}

export default Assignments
