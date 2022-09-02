import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {auth} from '../firebase'
import {onAuthStateChanged} from 'firebase/auth'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  const [user,setUser] = useState(null)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        if(user){
          setUser(user)
        }
        else{
          setUser(null)
        }
    })
},[])
  return (
    <ChakraProvider>
      <>
      <Component {...pageProps} user={user} />
      </>
    </ChakraProvider>
  )
}

export default MyApp
