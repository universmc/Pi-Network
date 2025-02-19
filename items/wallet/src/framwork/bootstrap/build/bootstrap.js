const modulesData = [
    // ... ton JSON ici ...
  ];
  
  // Fonction pour créer une section HTML pour un module
  function createModuleSection(module) {
    const section = document.createElement('section');
    // ... code pour créer le HTML de la section ...
    return section;
  }
  
  // Parcourir les modules et créer les sections correspondantes
  modulesData.forEach(module => {
    const section = createModuleSection(module);
    document.body.appendChild(section);
  });