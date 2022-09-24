const assert = require('assert');
const { should, use } = require('chai');
const { before } = require('lodash');

const Files = artifacts.require("Files");

require('chai')
use(require('chai-as-promised'))
should()

contract('Files',(accounts)=>{
    let files;

    beforeEach(async function () {
        files = await Files.deployed()
      });

    describe('deployment',async()=>{
        it('deployment success',async()=>{
            const address = files.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
    })

    describe('upload hash',async()=>{
        it('upload hash success',async()=>{
            let hash
            hash ='bca'
            await files.set(hash)
            const result = await files.get()
            assert.equal(hash,result)
        })
    })
})