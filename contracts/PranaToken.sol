pragma solidity ^0.4.24;

import "./ERC20.sol"

contract PranaToken is ERC20 {
    string public TokenName = "PRANA";
    string public symbol = "PRNA";
    uint public decimals = 18;
    uint public INITIAL_SUPPLY = 10000*(10**decimals);

    constructor() public {
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}