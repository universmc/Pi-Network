// generousTresor.js

let tresor = {
    total: 314000000000, // Supposons que c'est la valeur du "trésor" en euros
    allocated: 0,
    allocations: []
};

const generosityCriteria = {
    minimumContribution: 100, // Exemple : un minimum de contribution pour être éligible
    maximumPerEntity: 50000, // Un maximum par entité par an
    totalPerYear: tresor.total * 0.2 // Par exemple, 20% du trésor chaque année
};

function calculateGenerosity(entity) {
    let generosityAmount = 0;
    
    if (entity.contribution >= generosityCriteria.minimumContribution) {
        // Calcul basique: un pourcentage de la contribution de l'entité
        generosityAmount = Math.min(entity.contribution * 0.5, generosityCriteria.maximumPerEntity);
        
        // Assurez-vous que nous n'allouons pas plus que ce qui est disponible pour l'année
        if (tresor.allocated + generosityAmount > generosityCriteria.totalPerYear) {
            generosityAmount = generosityCriteria.totalPerYear - tresor.allocated;
        }
    }

    return generosityAmount;
}
function distributeTresor(entities) {
    for (let entity of entities) {
        let amountToAllocate = calculateGenerosity(entity);
        
        if (amountToAllocate > 0) {
            tresor.allocated += amountToAllocate;
            tresor.allocations.push({
                entity: entity.name,
                amount: amountToAllocate,
                year: new Date().getFullYear()
            });
            
            // Mise à jour de la balance du trésor
            tresor.total -= amountToAllocate;
        }
    }
}

// Exemple d'utilisation
let entities = [
    {name: "Association A", contribution: 10000},
    {name: "Association B", contribution: 500},
    {name: "Association C", contribution: 200000} // Attention, ce montant dépasse le maximum
];

distributeTresor(entities);
console.log(tresor);