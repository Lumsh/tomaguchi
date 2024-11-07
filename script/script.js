let hunger = 500, play = 500, walk = 500;
const maxLevel = 500;
const pet = document.getElementById('pet');
const happy = document.getElementById('happy');
const sad = document.getElementById('sad');
const needsMessage = document.getElementById('needsMessage');
const hungerFill = document.getElementById('hungerFill');
const playFill = document.getElementById('playFill');
const walkFill = document.getElementById('walkFill');


function loadLevels() {
  const savedHunger = localStorage.getItem('hunger');
  const savedPlay = localStorage.getItem('play');
  const savedWalk = localStorage.getItem('walk');

  hunger = savedHunger !== null ? parseInt(savedHunger) : maxLevel;
  play = savedPlay !== null ? parseInt(savedPlay) : maxLevel;
  walk = savedWalk !== null ? parseInt(savedWalk) : maxLevel;
}


function saveLevels() {
  localStorage.setItem('hunger', hunger);
  localStorage.setItem('play', play);
  localStorage.setItem('walk', walk);
}


function updateMouth() {
  happy.style.display = 'none';
  sad.style.display = 'none';

  if (hunger <= maxLevel * 0.4 || play <= maxLevel * 0.4 || walk <= maxLevel * 0.4) {
    happy.style.display = 'block';
  } else {
    sad.style.display = 'block';
  }
}


function updateLevels() {
  hungerFill.style.width = `${(hunger / maxLevel) * 100}%`;
  playFill.style.width = `${(play / maxLevel) * 100}%`;
  walkFill.style.width = `${(walk / maxLevel) * 100}%`;

  if (hunger <= maxLevel * 0.4) {
    needsMessage.innerText = "The pet is hungry!";
    needsMessage.style.display = 'block';
  } else if (play <= maxLevel * 0.4) {
    needsMessage.innerText = "The pet wants to play!";
    needsMessage.style.display = 'block';
  } else if (walk <= maxLevel * 0.4) {
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
  saveLevels(); 
}

function playWithPet() {
  play = maxLevel;
  updateMouth();
  updateLevels();
  saveLevels(); 
}

function takePetForWalk() {
  if (walk > 0) {
    walk = maxLevel;
    pet.style.animation = 'none';
    setTimeout(() => {
      pet.style.animation = 'walk 3s ease-in-out';

      setTimeout(() => {
        pet.style.animation = 'bounce 1s infinite alternate';
        updateMouth();
        updateLevels();
        saveLevels(); 
      }, 3000);
    }, 10);
  }
}


setInterval(() => {
  hunger = Math.max(0, hunger - 10);
  play = Math.max(0, play - 5);
  walk = Math.max(0, walk - 3);
  updateMouth();
  updateLevels();
  saveLevels(); 
}, 1000);


loadLevels();
updateMouth();
updateLevels();