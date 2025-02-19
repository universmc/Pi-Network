const fs = require('fs');
const path = require('path');
const rdflib = require('rdflib');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

async function analyzeMeta() {
  try {
    // Initialiser le store RDF
    const store = rdflib.graph();
    const RDF = rdflib.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
    const RDFS = rdflib.Namespace('http://www.w3.org/2000/01/rdf-schema#');
    const META = rdflib.Namespace('http://example.org/meta#');

    // Lire le fichier d'entrée
    const inputPath = path.join(__dirname, 'input', 'readme.md');
    const content = fs.readFileSync(inputPath, 'utf8');

    // Analyser les métadonnées
    const metaData = {};
    const tfidf = new TfIdf();
    
    // Rechercher les balises meta
    const metaRegex = /<meta[^>]*>/g;
    const metas = content.match(metaRegex) || [];

    metas.forEach((meta, index) => {
      const nameMatch = meta.match(/name="([^"]*)"/);
      const contentMatch = meta.match(/content="([^"]*)"/);
      
      if (nameMatch && contentMatch) {
        const name = nameMatch[1];
        const content = contentMatch[1];
        metaData[name] = content;

        // Ajouter au graphe RDF
        const subject = rdflib.sym(`${META}meta${index}`);
        store.add(subject, RDF('type'), META('MetaTag'));
        store.add(subject, META('name'), rdflib.literal(name));
        store.add(subject, META('content'), rdflib.literal(content));

        // Analyse NLP
        const tokens = tokenizer.tokenize(content);
        tfidf.addDocument(tokens);
      }
    });

    // Analyse cognitive approfondie
    const analysis = {
      totalMetas: Object.keys(metaData).length,
      categories: {},
      nlpInsights: [],
      rdfTriples: [],
      semanticRelations: {}
    };

    // Catégoriser et analyser sémantiquement
    for (const [key, value] of Object.entries(metaData)) {
      const category = key.split(':')[0];
      if (!analysis.categories[category]) {
        analysis.categories[category] = [];
      }
      analysis.categories[category].push({key, value});

      // Analyse des termes importants
      const tokens = tokenizer.tokenize(value);
      const uniqueTerms = [...new Set(tokens)];
      
      uniqueTerms.forEach(term => {
        tfidf.tfidfs(term, (i, measure) => {
          if (measure > 0) {
            if (!analysis.semanticRelations[term]) {
              analysis.semanticRelations[term] = [];
            }
            analysis.semanticRelations[term].push({
              meta: key,
              relevance: measure
            });
          }
        });
      });
    }

    // Extraire les triplets RDF
    store.statementsMatching(undefined, undefined, undefined).forEach(statement => {
      analysis.rdfTriples.push({
        subject: statement.subject.value,
        predicate: statement.predicate.value,
        object: statement.object.value
      });
    });

    // Générer le rapport
    const date = new Date().toISOString().split('T')[0];
    const outputPath = path.join(__dirname, 'output', `file${date}.md`);

    const output = `# Enhanced Meta Analysis Report (${date})

## Overview
Total meta tags analyzed: ${analysis.totalMetas}

## Semantic Categories
${Object.entries(analysis.categories).map(([category, items]) => `
### ${category}
${items.map(item => `- ${item.key}: ${item.value}`).join('\n')}`).join('\n')}

## NLP Insights
### Key Terms and Relations
${Object.entries(analysis.semanticRelations)
  .filter(([_, relations]) => relations.some(r => r.relevance > 0.5))
  .map(([term, relations]) => `
#### ${term}
${relations.map(r => `- Related to ${r.meta} (relevance: ${r.relevance.toFixed(3)})`).join('\n')}
`).join('\n')}

## RDF Structure
\`\`\`turtle
${analysis.rdfTriples.map(triple => 
  `<${triple.subject}> <${triple.predicate}> "${triple.object}" .`
).join('\n')}
\`\`\`

## Raw Meta Data
\`\`\`json
${JSON.stringify(metaData, null, 2)}
\`\`\`
`;

    // Écrire le fichier de sortie
    fs.writeFileSync(outputPath, output);
    console.log(`Enhanced analysis complete. Results saved to ${outputPath}`);

  } catch (error) {
    console.error('Error during enhanced meta analysis:', error);
  }
}

analyzeMeta();


