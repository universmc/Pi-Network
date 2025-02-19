// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @title SmartContractCVNU
 * @dev Gestion du CV Numérique Universel (CVNU), des niveaux de compétences et de la redistribution de la TVA
 */
contract SmartContractCVNU {

    // Définition des rôles possibles
    enum Role { Citoyen, Commerce, Artisan, AutoEntrepreneur, Entreprise }

    struct User {
        address owner;
        Role role;
        uint256 balance;
        uint256 valeurTravail; // PVT (Points Valeur Travail)
        uint8 niveau;  // Niveau de compétences affectant la TVA
        string secteur; // Type d’activité (boulangerie, bijouterie, librairie...)
        bool isEligible; // Vérifie si l’utilisateur peut recevoir la TVA
    }

    mapping(address => User) public users;
    mapping(address => string) public cvnu;  // Stocke les CVNU sur la blockchain
    address public admin;
    uint256 public totalTVACollected;

    event Deposit(address indexed user, uint256 amount, string reason);
    event Withdrawal(address indexed user, uint256 amount);
    event TVARecovered(address indexed user, uint256 amount, string message);
    event ReputationUpdated(address indexed user, uint256 newReputation);
    event CVNURegistered(address indexed user, string data);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Seul l'admin peut exécuter cette action.");
        _;
    }

    modifier userExists() {
        require(users[msg.sender].owner != address(0), "Utilisateur non enregistré.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // 📌 Enregistrer un utilisateur
    function ajouterUtilisateur(
        address _user, 
        Role _role, 
        uint8 _niveau, 
        string memory _secteur, 
        bool _isEligible
    ) external onlyAdmin {
        require(users[_user].owner == address(0), "Utilisateur déjà enregistré.");

        users[_user] = User({
            owner: _user,
            role: _role,
            balance: 0,
            valeurTravail: calculerValeurTravail(_niveau, _secteur),
            niveau: _niveau,
            secteur: _secteur,
            isEligible: _isEligible
        });
    }

    // 💰 Dépôt de TVA
    function deposit(string memory reason) external payable userExists {
        users[msg.sender].balance += msg.value;
        totalTVACollected += msg.value;

        emit Deposit(msg.sender, msg.value, reason);
    }

    // 🎁 Récupération d’une TVA ajustée au niveau et au secteur d'activité
    function recupererTVA() external userExists {
        require(users[msg.sender].balance > 0, "Solde insuffisant pour récupérer la TVA.");
        require(users[msg.sender].isEligible, "Non éligible à la récupération de TVA.");

        uint256 tvaToRecover = (users[msg.sender].balance * users[msg.sender].niveau) / 100;
        require(tvaToRecover > 0, "Aucune TVA récupérable.");

        users[msg.sender].balance -= tvaToRecover;
        payable(msg.sender).transfer(tvaToRecover);

        emit TVARecovered(msg.sender, tvaToRecover, "TVA récupérée avec succès !");
    }

    // 📈 Mise à jour de la réputation et du niveau du citoyen
    function mettreAJourReputation(address _user, uint256 newReputation) external onlyAdmin {
        require(users[_user].owner != address(0), "Utilisateur non enregistré.");

        users[_user].valeurTravail = newReputation;

        emit ReputationUpdated(_user, newReputation);
    }

    // 📤 Retrait des fonds pour les commerces
    function withdraw(uint256 _amount) external userExists {
        require(users[msg.sender].balance >= _amount, "Solde insuffisant.");

        users[msg.sender].balance -= _amount;
        payable(msg.sender).transfer(_amount);

        emit Withdrawal(msg.sender, _amount);
    }

    // 🧮 Calcul du PVT basé sur le niveau et le secteur
    function calculerValeurTravail(uint8 _niveau, string memory _secteur) internal pure returns (uint256) {
        uint256 baseValue = _niveau * 500;

        if (keccak256(abi.encodePacked(_secteur)) == keccak256(abi.encodePacked("Boulangerie"))) {
            return baseValue + 300; // Bonus pour secteur essentiel
        } else if (keccak256(abi.encodePacked(_secteur)) == keccak256(abi.encodePacked("Librairie"))) {
            return baseValue + 200; // Contribution à la culture
        } else {
            return baseValue;
        }
    }

    // 🔍 Associer un CVNU à un utilisateur
    function enregistrerCVNU(address _user, string memory cvData) external onlyAdmin {
        cvnu[_user] = cvData;
        emit CVNURegistered(_user, cvData);
    }

    // 🔎 Récupérer un CVNU
    function obtenirCVNU(address _user) external view returns (string memory) {
        return cvnu[_user];
    }
}
