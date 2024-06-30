
  // Example array of player data
  const players = [
    { name: "Alice", maxScore: 1000 },
    { name: "Bob", maxScore: 1000},
    { name: "Eve", maxScore: 1000 }
  ];

  // Function to display achievements
  function displayAchievements(players) {
    const container = document.getElementById('achievementsContainer');

    players.forEach(player => {
      const title = document.createElement('div');
      title.classList.add('title');
      title.textContent = `${player.name}'s Achievements`;
      container.appendChild(title);

      // Add a separator between players' achievements
      const separator = document.createElement('hr');
      container.appendChild(separator);
    });
  }

  // Call the function to display achievements
  displayAchievements(players);