// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-cmi5MWr8r3d6mCsEmuVUFETFFiqHGGc",
  authDomain: "first-project-7ec08.firebaseapp.com",
  projectId: "first-project-7ec08",
  storageBucket: "first-project-7ec08.appspot.com",
  messagingSenderId: "101661306308",
  appId: "1:101661306308:web:32db06816e61dca4cdc891"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);
const scoresRef = ref(database, 'scores');

// Function to push data to Firebase
function pushDataToFirebase(data) {
    // var x = document.getElementById("player").innerText;
    // var y = parseInt(document.getElementById("maximum").innerText);
    // const data = {
    //     name: x,
    //     id: y
    // }
    push(scoresRef, data)
    .then(() => {
      console.log('Data pushed successfully!');
    })
    .catch((error) => {
      console.error('Error pushing data:', error);
    });
}

// Function to read data from Firebase
function readDataFromFirebase(path) {
  return new Promise((resolve, reject) => {
      const dataRef = ref(database, path);
      
      onValue(dataRef, (snapshot) => {
          if (snapshot.exists()) {
              var data = snapshot.val();
              var keys = Object.keys(data);
              var scores = [];

              for (var i = 0; i < keys.length; i++) {
                  var k = keys[i];
                  var playerName = data[k].name;
                  var scoredata = data[k].score;
                  scores.push({ name: playerName, score: scoredata });
              }
              resolve(scores);
          } else {
              console.log('No data available');
              resolve([{ name: "player", score: "score" }]);
          }
      }, (error) => {
          console.error('Error reading data:', error);
          reject(error); // Reject promise in case of error
      });
  });
}

  export { pushDataToFirebase };
  export { readDataFromFirebase };