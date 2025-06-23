const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json.json'); // adjust filename if needed

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;