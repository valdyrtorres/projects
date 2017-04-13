pragma solidity ^0.4.0;

contract Fundo {

    address public owner;
    uint256 public value;
    address[] public claims;
    mapping(address => uint) public votes;
    uint256 public totalVotes;
    address public winner;
    uint256 public winnerNumberOfVotes = 0;

    modifier notOwner() {
      if (msg.sender == owner) throw;
      _;
    }

    modifier onlyOwner() {
      if (msg.sender != owner) throw;
      _;
    }

    modifier onlyWinner() {
      if (msg.sender != winner) throw;
      _;
    }

    function Fundo() payable {
        owner = msg.sender;
        value = msg.value;
    }

    function claim() notOwner {
        claims.push(msg.sender);
    }

    function vote(address claimer) notOwner {
      votes[claimer] += 1;
      totalVotes += 1;
    }

    function finish() onlyOwner {
      for (uint i = 0; i < claims.length; i++) {
        address claimer = claims[i];
        uint numberOfVotes = votes[claimer];
        if (numberOfVotes > winnerNumberOfVotes) {
          winnerNumberOfVotes = numberOfVotes;
          winner = claims[i];
        }
      }
    }

    function withdrawal() payable onlyWinner {
      if (msg.sender != winner) throw;
      if (!msg.sender.send(value)) throw;
    }
}
