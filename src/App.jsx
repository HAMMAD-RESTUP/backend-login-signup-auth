import logo from './logo.svg';
import './App.css';

import { ChakraProvider } from '@chakra-ui/react'
import Approuter from './config/approuter';
function App() {
  return (
    <>
      <ChakraProvider>
      
       <Approuter/>

      </ChakraProvider>

    </>
  )
}

export default App;
