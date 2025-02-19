// Paramètres personnalisables
const gridSize = 10;
const initialFibonacciValue = 1;
const scaleFactor = 10;

// Fonction pour générer une grille de cellules
function createGrid(size, initialValue, scale) {
  // ... (code existant)

  // Calcul de la taille de la cellule en utilisant la suite de Fibonacci
  const cellSize = fibonacci(j + 1) * scale;

  // Ajout d'attributs RDFa plus détaillés
  cell.setAttribute('typeof', 'http://example.com/Cell');
  cell.setAttribute('property', 'position', `${i},${j}`);
  cell.setAttribute('property', 'size', cellSize);
  cell.setAttribute('property', 'color', 'blue'); // Exemple de propriété supplémentaire

  // ... (reste du code)
}

// Fonction pour gérer les événements sur les cellules
function handleCellClick(event) {
  const cell = event.target;
  console.log('Cell clicked:', cell.getAttribute('property', 'position'));
  // Autres actions à effectuer lors du clic
}

// Ajout d'un écouteur d'événements
gridContainer.addEventListener('click', handleCellClick);