
const ipfsClient = require('ipfs-http-client')
const OrbitDB = require('orbit-db')
const ipfs = ipfsClient({ host: '192.168.137.10', port: 5001, protocol: 'http', apiPath:'/ipfs/api/v0'}) // leaving out the arguments will default to these values
const orbitdb = await OrbitDB.createInstance(ipfs)

export const onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting file to ipfs...")

    ipfs.add(this.state.buffer,{pin:true}, (error, result) => {
      console.log('Ipfs result', result[0].hash)
      if(error) {
        console.error(error)
      }
      return
      //  this.state.contract.methods.set(result[0].hash).send({ from: this.state.account }).then((r) => {
      //    return this.setState({ memeHash: result[0].hash })
      //  })
    })
  }

  export const captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }