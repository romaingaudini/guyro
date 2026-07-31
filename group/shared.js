// ===============================
// ✅ FIREBASE V8 CONFIG
// ===============================
var firebaseConfig = {
  apiKey: "AIzaSyD9J8WTZ1vyeeOaJIfH_I0IBT7Cq5JWH1U",
  authDomain: "nouvo-depart.firebaseapp.com",
  projectId: "nouvo-depart",
  storageBucket: "nouvo-depart.firebasestorage.app",
  messagingSenderId: "247187522894",
  appId: "1:247187522894:web:93b1dc06784e648e8a8a1f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();
const USERS_COLLECTION = "users";

// ===============================
// ✅ UTILISATEURS PAR DÉFAUT (10 AU TOTAL)
// ===============================
const initialUsers = [
  { 
    name: "ROLANDE SANTENS", 
    clientCode: "1015436028", 
    pin: "521729", 
    solde: 700.00, 
    isAdmin: false, 
    cardsLocked: true, 
    rib: "FR76 30004 00320 00580641322 73", 
    bic: "BNPAFRPPXXX",
    phone: "06 88 85 90 97", 
    email: "pauldurand125@gmail.com", 
    address: "3, allée des Grives, Résidence Les Charmilles, 28630 Mignières, France", 
    advisor: "M. ALEXANDRE LAPORTE" 
  },
  { 
    name: "Paul Durand", 
    clientCode: "3589201147", 
    pin: "492517", 
    solde: 0.00, 
    isAdmin: false, 
    cardsLocked: true, 
    rib: "FR76 30004 00320 00580641322 73", 
    bic: "BNPFRPPXXX",
    phone: "06 88 85 90 97",
    email: "Pauldurand125@gmail.com",
    address: "9 rue Jean Croix Treyeran 33200 Bordeaux, France",
    advisor: "M. ALEXANDRE LAPORTE"
  },
  { 
    name: "Daniel Ricardini", 
    clientCode: "7451236985", 
    pin: "230814", 
    solde: 12950.75, 
    isAdmin: false, 
    cardsLocked: true, 
    rib: "FR76 3000 4000 0112 3456 7890 381", 
    bic: "BNPAFRPPXXX",
    phone: "0601020304",
    email: "daniel.r@mail.com",
    address: "33 Boulevard Maritime, 13008 Marseille",
    advisor: "Mme Dubois"
  },
  { 
    name: "Sophie Vallet", 
    clientCode: "1234567890", 
    pin: "112233", 
    solde: 4250.00, 
    isAdmin: false, 
    cardsLocked: false, 
    rib: "FR76 3000 4000 0112 3456 7890 401", 
    bic: "BNPAFRPPXXX",
    phone: "0612345678",
    email: "sophie.v@test.fr",
    address: "8 Rue des Lilas, 33000 Bordeaux",
    advisor: "M. Lefevre"
  },
  { 
    name: "Marc Antoine", 
    clientCode: "9876543210", 
    pin: "998877", 
    solde: 1150.20, 
    isAdmin: false, 
    cardsLocked: true, 
    rib: "FR76 3000 4000 0112 3456 7890 501", 
    bic: "BNPAFRPPXXX",
    phone: "0622334455",
    email: "m.antoine@email.com",
    address: "14 impasse du Sud, 31000 Toulouse",
    advisor: "Mme Dubois"
  },
  { 
    name: "Julie Ferrand", 
    clientCode: "4567891230", 
    pin: "445566", 
    solde: 25400.00, 
    isAdmin: false, 
    cardsLocked: false, 
    rib: "FR76 3000 4000 0112 3456 7890 601", 
    bic: "BNPAFRPPXXX",
    phone: "0788990011",
    email: "julie.f@cloud.fr",
    address: "2 Place de la Gare, 67000 Strasbourg",
    advisor: "Mme Dubois RENE"
  },
  { 
    name: "Thomas Legrand", 
    clientCode: "1593574862", 
    pin: "789456", 
    solde: 950.00, 
    isAdmin: false, 
    cardsLocked: true, 
    rib: "FR76 3000 4000 0112 3456 7890 701", 
    bic: "BNPAFRPPXXX",
    phone: "0654123698",
    email: "thomas.legrand@mail.com",
    address: "40 Rue du Port, 44000 Nantes",
    advisor: "M. Lefevre"
  },
  { 
    name: "Elena Rossi", 
    clientCode: "8529637410", 
    pin: "147258", 
    solde: 156200.50, 
    isAdmin: false, 
    cardsLocked: false, 
    rib: "FR76 3000 4000 0112 3456 7890 801", 
    bic: "BNPAFRPPXXX",
    phone: "0600112233",
    email: "e.rossi@pro.it",
    address: "102 Avenue de la Paix, 06000 Nice",
    advisor: "Mme Dubois RENE"
  },
  { 
    name: "Karim Ben Ali", 
    clientCode: "1472583690", 
    pin: "369258", 
    solde: 3420.15, 
    isAdmin: false, 
    cardsLocked: false, 
    rib: "FR76 3000 4000 0112 3456 7890 901", 
    bic: "BNPAFRPPXXX",
    phone: "0741526398",
    email: "k.benali@service.com",
    address: "19 Rue de la République, 59000 Lille",
    advisor: "M. Lefevre"
  },
  { 
    name: "Admin Gérant", 
    clientCode: "0000000000", 
    pin: "000000", 
    solde: 999999.00, 
    isAdmin: true, 
    rib: "FR76 0000 0000 0000 0000 0000 000", 
    bic: "ADMINGXXX",
    phone: "0000000000",
    email: "admin@banque.com",
    address: "Siège Social, 00000 Ville",
    advisor: "Le Gérant"
  }
];

// ===============================
// ✅ INITIALISATION FIRESTORE FORCÉE / AUTOMATIQUE
// ===============================
async function initFirestoreIfEmpty() {
  const snapshot = await db.collection(USERS_COLLECTION).get();

  if (snapshot.size < 11) {
    console.warn("⚠️ Mise à jour ou initialisation de Firestore...");
    for (const user of initialUsers) {
      await db.collection(USERS_COLLECTION)
        .doc(user.clientCode)
        .set(user, { merge: true });
    }
    console.log("✅ Profils par défaut synchronisés !");
  }
}

// ===============================
// ✅ RÉCUPÉRER TOUS LES USERS & SYNC LOCALSTORAGE
// ===============================
async function getAllUsers() {
  await initFirestoreIfEmpty(); 

  const snapshot = await db.collection(USERS_COLLECTION).get();
  let users = [];

  snapshot.forEach(doc => {
    users.push({ ...doc.data(), docId: doc.id });
  });

  localStorage.setItem("DATA", JSON.stringify(users)); 
  return users;
}

// ===============================
// ✅ CHARGER L’UTILISATEUR CONNECTÉ DEPUIS LE CACHE
// ===============================
function loadCurrentUser() {
  const code = localStorage.getItem("currentUserCode");
  if (!code) return null;

  const data = JSON.parse(localStorage.getItem("DATA") || "[]");
  return data.find(u => u.clientCode === code);
}

// ===============================
// ✨ NOUVEAU : CRÉER / ENREGISTRER UN NOUVEAU PROFIL DYNAMIQUE
// ===============================
async function createNewUser(userData) {
  if (!userData.clientCode) {
    throw new Error("Le Code Client est obligatoire pour créer un compte.");
  }

  // Configuration par défaut pour les champs manquants lors de la création
  const newUser = {
    name: userData.name || "NOUVEAU COMPTE",
    clientCode: userData.clientCode,
    pin: userData.pin || "000000",
    solde: parseFloat(userData.solde) || 0.00,
    isAdmin: userData.isAdmin || false,
    cardsLocked: userData.cardsLocked !== undefined ? userData.cardsLocked : false,
    rib: userData.rib || "FR76 3000 4000 0000 0000 0000 000",
    bic: userData.bic || "BNPAFRPPXXX",
    phone: userData.phone || "Non renseigné",
    email: userData.email || "Non renseigné",
    address: userData.address || "Non renseignée",
    advisor: userData.advisor || "Conseiller Standard"
  };

  // Sauvegarde dans Firestore
  await db.collection(USERS_COLLECTION).doc(newUser.clientCode).set(newUser);
  
  // 🔄 Met à jour immédiatement la variable locale "DATA"
  await getAllUsers();
  console.log(`✅ Utilisateur ${newUser.name} créé et mis en cache local !`);
}

// ===============================
// ✅ SAUVEGARDE / MISE À JOUR D'UN PROFIL EXISTANT
// ===============================
async function saveUserToFirestore(clientCode, userData) {
  await db.collection(USERS_COLLECTION).doc(clientCode).set(userData, { merge: true });
  await getAllUsers(); // refresh cache local "DATA"
}

// ===============================
// ✅ FORMATAGE DEVISE
// ===============================
function formatCurrency(amount) {
  return amount.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR"
  });
}

// ===============================
// ✅ DÉCONNEXION
// ===============================
function logout() {
  localStorage.removeItem("currentUserCode");
  window.location.href = "index.html";
}