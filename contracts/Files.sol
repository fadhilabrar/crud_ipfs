// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Files {
    string fileHashes;

    function set(string memory _hashes) public {
        fileHashes = _hashes;
    }

    function get() public view returns (string memory) {
        return fileHashes;
    }
}
