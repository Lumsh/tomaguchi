let hunger = 500, play = 500, walk = 500;
const maxLevel = 500;
const pet = document.getElementById('pet');
const happy = document.getElementById('happy');
const sad = document.getElementById('sad');
const needsMessage = document.getElementById('needsMessage');
const hungerFill = document.getElementById('hungerFill');
const playFill = document.getElementById('playFill');
const walkFill = document.getElementById('walkFill');

function updateMouth() {
  const happy = document.getElementById('happy');
  const sad = document.getElementById('sad');

  // Always hide both expressions initially
  happy.style.display = 'none';
  sad.style.display = 'none';

  // Show sad face if any level is at or below 30% of max level
  if (hunger <= maxLevel * 0.3 || play <= maxLevel * 0.3 || walk <= maxLevel * 0.3) {
    happy.style.display = 'block';    // Display sad face if any level is too low
  } else {
    sad.style.display = 'block';  // Display happy face if all levels are above 30%
  }
}

function updateLevels() {
  // Update the width of each level bar based on the current level
  hungerFill.style.width = `${(hunger / maxLevel) * 100}%`;
  playFill.style.width = `${(play / maxLevel) * 100}%`;
  walkFill.style.width = `${(walk / maxLevel) * 100}%`;

  // Display the needs message if any level is critically low
  if (hunger <= maxLevel * 0.3) {
    needsMessage.innerText = "The pet is hungry!";
    needsMessage.style.display = 'block';
  } else if (play <= maxLevel * 0.2) {
    needsMessage.innerText = "The pet wants to play!";
    needsMessage.style.display = 'block';
  } else if (walk <= maxLevel * 0.2) {
    needsMessage.innerText = "The pet needs a walk!";
    needsMessage.style.display = 'block';
  } else {
    needsMessage.style.display = 'none';
  }
}

function feedPet() {
  hunger = maxLevel;
  updateMouth();
  updateLevels();
}

function playWithPet() {
  play = maxLevel;
  updateMouth();
  updateLevels();
}

function takePetForWalk() {
  if (walk > 0) {
    walk = maxLevel;
    pet.style.animation = 'none';
    setTimeout(() => {
      pet.style.animation = 'walk 3s ease-in-out';

      // After the walk, resume the bounce animation
      setTimeout(() => {
        pet.style.animation = 'bounce 1s infinite alternate';
        updateMouth();
        updateLevels();
      }, 3000); // 3 seconds for walk animation
    }, 10); // Small delay to remove the previous animation
  }
}

updateMouth();
updateLevels();

// Automatically decrease levels over time
setInterval(() => {
  hunger = Math.max(0, hunger - 10);
  play = Math.max(0, play - 5);
  walk = Math.max(0, walk - 3);
  updateMouth();
  updateLevels();
}, 1000);