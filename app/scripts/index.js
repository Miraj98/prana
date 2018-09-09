// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css';
import "truffle-contract";

const IPFS = require('ipfs-mini');
const node = new IPFS({ host: 'localhost', port: 5001, protocol: 'http' });

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
    node.add(postContent, (err, result) => {
        prana.deployed().then(instance => {
            instance.addContent(result, { from:web3.eth.accounts[0] })
        });
    });
}

function getUserPost() {
    prana.deployed().then(instance => {
        instance.getNumOfUserPost().then(result => {
            $("#post").append("<h1>Your Posts: </h1>");
            $("#post").append("<br><br>");
            for(let i = 0; i < result.toNumber(); i++) {
                prana.deployed().then(instance => {
                    instance.getUserPost(web3.eth.accounts[0],i)
                        .then(result=>{
                            ipfs.cat(result, (err, response) =>{
                                $("#post").append(`<div><h2>${i+1}. ${String.fromCharCode.apply(String, response)}</h2></div>`);
                            })
                    });
                });
            }
        });
    });
}

$(window).load(function() {
    ProvideWeb3(function() {
        getContractArtifacts();
    });

    $("#send").click(function() {
        var post = $("#amount").val(); 
        addPost(post);
    });
    $("#getPost").click(function() {
        getUserPost();
    });

});
