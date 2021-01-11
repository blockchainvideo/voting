// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract voting {
     
    uint256 count;
    string defaultVote='not yet voted';

    struct voterDetails {
    uint256 voterID;
    string voterChoice;
    bool voteStatus;
    address voterAddress;
    }

    struct governmentCandidates {
    string candidateName;
    string candidatePartyName;
    uint256 votecount;
    }

    mapping(address=> voterDetails) public voter;
    mapping(string=> governmentCandidates) public candidate;

    constructor() public {
        count = 0;
        initializeCandidate();
    }

    function addVoter() external returns(uint256){
    voter[msg.sender] = voterDetails(count,defaultVote,false,msg.sender);
    count++;
    return count-1;    
    }

    function getvotermapping(address index) public view returns(uint256,string memory,bool,address) {
    uint256 id= voter[index].voterID;
    string memory choice= voter[index].voterChoice;
    bool status = voter[index].voteStatus;
    address voterAddress= voter[index].voterAddress;
    return (id,choice,status,voterAddress);
    }

    function initializeCandidate() internal {
    candidate["Trump"]= governmentCandidates("Trump","Republican",count);
    candidate["Biden"]= governmentCandidates("Biden","Democrat",count);
    }

    function vote(string memory candidateChoice) external {
    require(voter[msg.sender].voteStatus==false);
    candidate[candidateChoice].votecount++;
    voter[msg.sender].voterChoice=candidateChoice;
    voter[msg.sender].voteStatus=true;
    }

}