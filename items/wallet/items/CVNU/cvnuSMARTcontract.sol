// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CVNUSmartContract {
    struct User {
        address owner;
        string role;
        uint256 balance;
        uint256 valeurTravail; // PVT : Points de Valeur Travail
        uint8 niveau; // Niveau basé sur compétences et expériences
    }

    mapping(address => User) public users;
    address public admin;

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Redistribution(address indexed from, address indexed to, uint256 amount);
    event NiveauMisAJour(address indexed user, uint8 nouveauNiveau, uint256 nouvelleValeurTravail);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Seul l'administrateur peut exécuter cette fonction");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Créer un nouvel utilisateur
    function ajouterUtilisateur(address _user, string memory _role, uint8 _niveau) external onlyAdmin {
        users[_user] = User({
            owner: _user,
            role: _role,
            balance: 0,
            valeurTravail: calculerValeurTravail(_niveau),
            niveau: _niveau
        });
    }

    // Dépôt de fonds
    function deposit() external payable {
        users[msg.sender].balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Retrait de fonds
    function withdraw(uint256 _amount) external {
        require(users[msg.sender].balance >= _amount, "Solde insuffisant");
        users[msg.sender].balance -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdrawal(msg.sender, _amount);
    }

    // Redistribution de fonds basée sur la TVA
    function redistribuer(address _recipient, uint256 _amount) external onlyAdmin {
        require(users[_recipient].balance >= _amount, "Solde insuffisant pour redistribuer");
        users[_recipient].balance -= _amount;
        payable(_recipient).transfer(_amount);
        emit Redistribution(admin, _recipient, _amount);
    }

    // Mise à jour du niveau et de la valeur travail
    function mettreAJourNiveau(address _user, uint8 _nouveauNiveau) external onlyAdmin {
        require(_nouveauNiveau > 0 && _nouveauNiveau <= 10, "Niveau invalide");
        users[_user].niveau = _nouveauNiveau;
        users[_user].valeurTravail = calculerValeurTravail(_nouveauNiveau);
        emit NiveauMisAJour(_user, _nouveauNiveau, users[_user].valeurTravail);
    }

    // Calcul de la valeur travail (PVT)
    function calculerValeurTravail(uint8 _niveau) internal pure returns (uint256) {
        uint256 basePVT = 500;
        return basePVT * _niveau; // Chaque niveau augmente la valeur travail
    }
}
