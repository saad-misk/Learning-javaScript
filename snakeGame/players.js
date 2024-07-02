import {pushDataToFirebase} from './connect.js';
import {readDataFromFirebase} from './connect.js';

  // var data = {
  //   name: "ahmed",
  //   id: 123
  // }
  // pushDataToFirebase(data);

  // Example array of player data

  var player = "player X";
  var mx_score = 0;
  var current_score = 0;

  document.getElementById('myForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Get input value
      var name = document.getElementById("inputname").value.trim();
      player = name;
      if (name !== '') {
        document.getElementById("player").innerText = name;
        // Optionally, you can reset the input field after submission
        document.getElementById("inputname").value = '';
      } else {
        alert("Please enter a valid name!");
      }
  });

  document.getElementById('AddButton').addEventListener('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Your logic here
    current_score = parseInt(document.getElementById('maximum').textContent);

    if (current_score > mx_score) {
        mx_score = current_score;
        var data = {
            name: player,
            score: mx_score
        };
        pushDataToFirebase(data);
        document.getElementById('AddButton').textContent = 'Done!';
        fetchScoresFromFirebaseAndAssign().then(scores => {
          // scoresArray is now populated with data
          const players = scoresArray;
      
          // Function to display achievements
          function displayAchievements(players) {
              const container = document.getElementById('achievementsContainer');
              container.innerHTML = ''; // Clear previous content if any
      
              players.forEach(player => {
                  const title = document.createElement('div');
                  title.classList.add('title');
                  title.textContent = `${player.name}'s Achievements: ${player.score}`;
                  container.appendChild(title);
      
                  // Add a separator between players' achievements
                  const separator = document.createElement('hr');
                  container.appendChild(separator);
              });
          }
      
          // Call the function to display achievements
          displayAchievements(players);
      }).catch(error => {
          console.error('Error fetching and displaying achievements:', error);
      });
    } else {
        document.getElementById('AddButton').textContent = 'You are already there!';
    }
});

 
    
    let scoresArray = [];

    // Function to fetch scores from Firebase and assign them to scoresArray
    function fetchScoresFromFirebaseAndAssign() {
        return readDataFromFirebase('scores').then(scores => {
            // Assign the returned scores array to the global variable
            scoresArray = scores;
    
            // Return scores for chaining
            return scores;
        }).catch(error => {
            console.error('Error fetching data:', error);
            // Handle errors if necessary
            throw error; // Rethrow the error to propagate it
        });
    }
    
    // Call fetchScoresFromFirebaseAndAssign to initiate fetching and processing scores
    fetchScoresFromFirebaseAndAssign().then(scores => {
        // scoresArray is now populated with data
        const players = scoresArray;
        players.sort((a, b) => b.score - a.score);
        // Function to display achievements
        function displayAchievements(players) {
            const container = document.getElementById('achievementsContainer');
            container.innerHTML = ''; // Clear previous content if any
    
            players.forEach(player => {
                const title = document.createElement('div');
                title.classList.add('title');
                title.textContent = `${player.name}'s Achievements: ${player.score}`;
                container.appendChild(title);
    
                // Add a separator between players' achievements
                const separator = document.createElement('hr');
                container.appendChild(separator);
            });
        }
    
        // Call the function to display achievements
        displayAchievements(players);
    }).catch(error => {
        console.error('Error fetching and displaying achievements:', error);
    });
