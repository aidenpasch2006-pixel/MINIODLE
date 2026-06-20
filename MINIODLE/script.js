const minions = [
  { name: "Kevin", shape: "Tall", eyes: "Two-eyed", hair: "Sprout", image: "images/kevin.png" },
  { name: "Stuart", shape: "Short", eyes: "One-eyed", hair: "Combed", image: "images/stuart.png" },
  { name: "Bob", shape: "Short", eyes: "Two-eyed", hair: "Bald", image: "images/bob.png" },
  { name: "Otto", shape: "Short", eyes: "Two-eyed", hair: "Short", image: "images/otto.png" },
  { name: "Dave", shape: "Medium", eyes: "Two-eyed", hair: "Short", image: "images/dave.png" },
  { name: "Jerry", shape: "Short", eyes: "Two-eyed", hair: "Short", image: "images/jerry.png" },
  { name: "Carl", shape: "Short", eyes: "One-eyed", hair: "Spiky", image: "images/carl.png" },
  { name: "Phil", shape: "Short", eyes: "One-eyed", hair: "Combed", image: "images/phil.png" },
  { name: "Tim", shape: "Tall", eyes: "Two-eyed", hair: "Sprout", image: "images/tim.png" },
  { name: "Mark", shape: "Short", eyes: "Two-eyed", hair: "Short", image: "images/mark.png" },
  { name: "Larry", shape: "Short", eyes: "Two-eyed", hair: "Short", image: "images/larry.png" },
  { name: "Lance", shape: "Tall", eyes: "One-eyed", hair: "Bald", image: "images/lance.png" },
  { name: "Mel", shape: "Short", eyes: "Two-eyed", hair: "Bald", image: "images/mel.png" },
  { name: "Ken", shape: "Tall", eyes: "Two-eyed", hair: "Short", image: "images/ken.png" },
  { name: "Barry", shape: "Short", eyes: "Two-eyed", hair: "Short", image: "images/barry.png" }
];

const answer = minions[Math.floor(Math.random() * minions.length)];

let selectedMinion = null;
let gameOver = false;

const answerImage = document.getElementById("answerImage");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const submitBtn = document.getElementById("submitBtn");
const guesses = document.getElementById("guesses");
const message = document.getElementById("message");

answerImage.src = answer.image;

function showList() {
  if (gameOver) return;

  searchResults.innerHTML = "";
  const search = searchInput.value.toLowerCase();

  const filtered = minions.filter(function (minion) {
    return minion.name.toLowerCase().includes(search);
  });

  filtered.forEach(function (minion) {
    const div = document.createElement("div");
    div.className = "result";

    div.innerHTML =
      "<strong>" + minion.name + "</strong>" +
      "<small>" + minion.shape + " - " + minion.eyes + " - " + minion.hair + "</small>";

    div.onclick = function () {
      selectedMinion = minion;
      searchInput.value = minion.name;
      searchResults.innerHTML = "";
      message.textContent = "Selected " + minion.name + ". Press Enter or SUBMIT.";
    };

    searchResults.appendChild(div);
  });
}

function submitGuess() {
  if (gameOver) return;

  if (!selectedMinion) {
    message.textContent = "Pick a Minion first.";
    return;
  }

  const row = document.createElement("div");
  row.className = "guess-row";

  row.appendChild(makeBox(selectedMinion.shape, answer.shape));
  row.appendChild(makeBox(selectedMinion.eyes, answer.eyes));
  row.appendChild(makeBox(selectedMinion.hair, answer.hair));
  row.appendChild(makeBox(selectedMinion.name, answer.name));

  guesses.appendChild(row);

  if (selectedMinion.name === answer.name) {
    message.textContent = "Correct! The answer was " + answer.name + ".";
    gameOver = true;
    submitBtn.disabled = true;
  } else {
    message.textContent = "Wrong. Try again.";
  }

  selectedMinion = null;
  searchInput.value = "";
}

function makeBox(guessValue, answerValue) {
  const box = document.createElement("div");
  box.textContent = guessValue;

  if (guessValue === answerValue) {
    box.className = "box correct";
  } else {
    box.className = "box wrong";
  }

  return box;
}

searchInput.addEventListener("focus", showList);
searchInput.addEventListener("click", showList);
searchInput.addEventListener("input", showList);

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const typedName = searchInput.value.trim().toLowerCase();

    const found = minions.find(function (minion) {
      return minion.name.toLowerCase() === typedName;
    });

    if (found) {
      selectedMinion = found;
    }

    submitGuess();
  }
});

submitBtn.addEventListener("click", submitGuess);