import { Box, Text , Link } from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';


const DisplayAssignments = ({slug}) => {
    const [assignments,setassignments] = useState([])
    const [insertId,setInsertId] = useState()

    const test =async () => {
        const docref = collection(db, "assignments")
        const q = query(docref, where("classcode", "==", slug));
        const docsnap = await getDocs(q)
        setassignments([])
        docsnap.forEach((doc)=>{
            const data = doc.data()
            data["id"] = doc.id
            setassignments((assignments)=>[...assignments,data])            
        })   
    }

    useEffect(() => {
        if(slug){
            test()
        }
    },[slug])


    return (
        <div>
            {
                assignments.map((a,key)=>{
                    return(
                        <Box  cursor={"pointer"} bg="blackAlpha.200" p="4" border={"1px"} borderRadius="14px" mt={"2vh"} key={key}>
                            <Link href={`/assignments/${a.id}`}>
                            <Text fontSize={"22px"} fontWeight="semibold" marginBottom={"1vh"}>Assignment Name : {a.name}</Text>
                            <Text fontSize={"18px"}>No of Files : {a.files.length}</Text>
                            </Link>
                        </Box>
                    )
                })
            }
        </div>
    )
}

export default DisplayAssignments
