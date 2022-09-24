/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box, SimpleGrid, FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button
} from "@chakra-ui/react";
import React, { useState, Component } from 'react';
import { Buffer } from 'buffer';
import { useParams } from 'react-router';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: '192.168.137.11', port: 5001, protocol: 'http', apiPath: '/api/v0' })

export default function Create(props) {

  const [buffer, setBuffer] = useState(null);
  const [name, setName] = useState("");

  async function onSubmit(event) {
    event.preventDefault()
    console.log("Submitting file to ipfs...")
    const startTime = Date.now();
    var file = await ipfs.add(buffer)
    const msElapsed = Date.now() - startTime
    console.log(`Response time ${name} size ${file.size} mb : ${msElapsed / 1000} seconds to complete.`)
    var hash = await props.contracts.methods.get().call()
    var lista = JSON.parse(hash)
    var newList = lista.concat({ "name": name, "cid": file.path })
    var jsonList = JSON.stringify(newList)
    await props.contracts.methods.set(jsonList).send({ from: props.accounts })
    history.back()
  }

  async function captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    setName(file.name)
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result))
    }
  }
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <FormControl id="name" isRequired>
          <FormLabel>Nama File</FormLabel>
          <Input placeholder="Nama File" borderRadius="16px" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id="file">
          <FormLabel>Upload File</FormLabel>
          <Input type="file" onChange={captureFile} />
          <FormHelperText>Silahkan Upload File Anda</FormHelperText>
        </FormControl>
        <Button
          mt={2}
          colorScheme="brand"
          isFullWidth={false}
          onClick={onSubmit}
          type="submit">
          Submit
        </Button>
      </SimpleGrid>
    </Box>
  );
}
