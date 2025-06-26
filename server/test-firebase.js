const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

db.collection('test').get()
  .then(snapshot => {
    console.log('Success! Firestore is working.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Firestore error:', err);
    process.exit(1);
  });
