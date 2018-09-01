// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css';
import "truffle-contract";

const IPFS = require('ipfs');
const node = new IPFS();

var prana;
var web3Provider;
function ProvideWeb3(callback) {
    if (typeof web3 !== 'undefined') {
        web3Provider = web3.currentProvider;
    } else {
        web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    console.log("Web3 provided.");
    callback();
}

function getContractArtifacts() {
    $.getJSON('../../build/contracts/prana.json', function(data) {
        prana = TruffleContract(data);
        console.log("Artifacts collected.");
        prana.setProvider(web3Provider);
        console.log("Web3 instantiated for the dApp.");
    });
}

function addPost(postContent) {
    var buff = Buffer.from(postContent);
    var ipfsHash;
    node.files.add(buff, function(err, result) {
        if(err){
            console.log(err);
        } else {
            ipfsHash = result[0].hash;
            prana.deployed().then(function(instance) {
                instance.addContent(ipfsHash, { from: web3.eth.accounts[0]});
            });
        }
    });
}

$(window).load(function() {
    ProvideWeb3(function() {
        getContractArtifacts();
    });

    node.on('ready', async () => {
        const version = await node.version();
        console.log("Version: ", version.version);
    });
});
