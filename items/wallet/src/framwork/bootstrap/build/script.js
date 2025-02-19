const modulesData = [
    {
      "module": "Les fondamentaux",
      "contenu": [
        {
          "titre": "HTML (HyperText Markup Language)",
          "sous_titres": [
            "Structure d'une page web",
            "Éléments HTML de base (balises, attributs)",
            "Sémantique HTML",
            "Formulaires"
          ],
          "description": "Apprenez à créer la structure de base d'une page web à l'aide du langage HTML."
        },
        // ... autres sous-modules du module 1 ...
      ]
    },
    {
      "module": "Bootstrap",
      "contenu": [
        // ... contenu du module Bootstrap ...
      ]
    },
    // ... autres modules ...
  ];
  
  // Fonction pour créer une section HTML pour un module
  function createModuleSection(module) {
    const section = document.createElement('main-content');
    // ... code pour créer le HTML de la section ...
    return section;
  }
  
  // Parcourir les modules et créer les sections correspondantes
  modulesData.forEach(module => {
    const section = createModuleSection(module);
    document.body.appendChild(section);
  });