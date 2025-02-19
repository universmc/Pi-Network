require('dotenv').config();
const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
  });

// Fonction de test de connexion
const testConnection = () => {
  paypal.payment.list({}, (error, payments) => {
    if (error) {
      console.error('Erreur de connexion à PayPal :', error);
    } else {
      console.log('Connexion réussie. Liste des paiements :', payments);
    }
  });
};

// Exécuter le test de connexion
testConnection();
