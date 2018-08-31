pragma solidity ^0.4.24;

contract Prana {

    struct User {
        string username;
        string email;
        string ProfilePhotoHash;
        string[] IpfsHashes; //This array records posts made by the users as an array of ipfs hashes
        address userAddr;
    }

    mapping (address => bool) private isRegistered;
    mapping (address => User) private registeredUsers;

    function addContent(string _IpfsHash) external {
        require(isRegistered[msg.sender] == true, "Current user not registered on the platform");
        registeredUsers[msg.sender].IpfsHashes.push(_IpfsHash);
    }

    function registerUser(address _addr, string _username, string _email, string _ProfilePhotoHash) external {
        require(isRegistered[_addr] == false, "Already registered");
        string[] memory _IpfsHashes;
        isRegistered[_addr] = true;
        registeredUsers[_addr] = User(_username, _email, _ProfilePhotoHash, _IpfsHashes, _addr);
    }

    function getUserPost(address _user, uint _IpfsHashIndex) external view returns(string) {
        return registeredUsers[_user].IpfsHashes[_IpfsHashIndex];
    }

}