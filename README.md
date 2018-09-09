# PRANA
A proof of concept for a decentralized social networking app. Uses IPFS as the storage layer with IPFS hash pointers stored on the Ethereum Blockchain.

## Some pre-requisites:
1. Download and install Ganache. Ganache is an awesome tool that helps you run a personal Ethereum blockchain on your local machine and test out smart contracts and dapps. You can download the GUI version from [here](https://truffleframework.com/ganache).
1. Install the Truffle Framework using npm - `npm install -g truffle`
1. To try out this dapp, it is best that you run an IPFS node. To do that you will have to download IPFS. You can follow the instructions provided on its official [website](https://ipfs.io/) to download and install IPFS.
1. `git clone` the remote repository or download the zip file.

## Usage Instructions:
1. `cd` to root of the project.
1. Now fire-up Ganache. Once thats done, let it run in the background and come back to your terminal window.
1. Now that your personal Ethereum blockchain is up and running with the help of Ganache, its time to migrate the smart contracts to the blockchain. To do that, run the following command in the terminal - `truffle migrate --reset`.
1. Once the smart contracts are successfully migrated, you will have to start your IPFS node. If you followed the instructions properly form its website, simply running the command `ipfs daemon` starts a node. Once you run the command, leave it open and open a new tab/window of the terminal. Make sure you `cd` to the root of the project if your current directory in this new tab is not that.
1. Finally, in the new tab/window of the terminal run `npm run dev`. Next open your browser and run `localhost` at port 8008.  
