pragma solidity ^0.8.0;

contract TVA {
    address public adminFiscale;
    mapping(address => uint256) public tvaCollectee;
    
    constructor() {
        adminFiscale = msg.sender;
    }
    
    function collecterTVA(address _entreprise, uint256 _montant) public {
        uint256 montantTVA = (_montant * 20) / 100; // Ex : TVA 20%
        tvaCollectee[_entreprise] += montantTVA;
    }
    
    function reverserTVA(address _entreprise) public {
        require(msg.sender == adminFiscale, "Seul l'administrateur peut reverser");
        payable(adminFiscale).transfer(tvaCollectee[_entreprise]);
        tvaCollectee[_entreprise] = 0;
    }
}
