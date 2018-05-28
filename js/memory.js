/*TO DO LIST
- Set game win logic
- Build game win modal
- Have modal pop up on game win
- Reset moves on game win
- Reset star rating on game win 
- Reset timer on game win 
*/
// Card and deck variables
let allCards = document.getElementsByClassName("card");
let cards = Array.from(allCards); //array of cards created from allCards
const cardList = document.querySelector(".cards-wrapper"); //card deck
let openCards = []; //array of open cards
let matchedCards = []; //array of matches
// Reset button variable
const resetButton = document.querySelector(".reset");
// Moves and Stars variables
let moves = 0;
let moveCounter = document.querySelector(".move-counter");
let stars = [...document.querySelectorAll(".fa-star")];
// Timer variables
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let totalSeconds = 0;
// Modal variables
const modal = document.querySelector(".modal");
const newGameButton = document.querySelector("#new-game");

document.onLoad = gameStart();

// Starts the game
function gameStart() {
  shuffle(cards);
  shuffledCards();
  moves = 0;
}

// loop over existing cards to display shuffled cards
function shuffledCards() {
  for (let i = 0; i < cards.length; i++) {
    cardList.innerHTML = "";
    // display shuffled cards
    for (let card of cards) {
      cardList.appendChild(card);
    }
  }
}

// moves counter functionality
function movesDisplay() {
  // if moves = 8 display 3 stars
  if (moves > 8) {
    stars[4].classList.add("hidden");
  }
  if (moves > 12) {
    stars[3].classList.add("hidden");
  }
  if (moves > 16) {
    stars[2].classList.add("hidden");
  }
  if (moves === 20) {
    stars[1].classList.add("hidden");
  }
}

// resets current game
resetButton.addEventListener("click", gameReset);

// reset functionality
function gameReset() {
  window.location = window.location;
}

// loop to add event listeners to all cards
for (let card of cards) {
  card.addEventListener("click", turnOver);
}

// Turns cards over and displays icon
function turnOver() {
  // Timer starts on first move
  if (moves == 0) {
    timeInterval();
  }
  moves++;
  movesDisplay();
  moveCounter.innerHTML = moves;
  if (openCards.length < 2) {
    this.classList.add("open", "show", "unclick");
    openCards.push(this);
  }
  // shows cards in open cards array for 1 second if there are 2 cards
  if (openCards.length === 2) {
    cardMatches();
  }
}

// checks to see if matches exist
function cardMatches() {
  setTimeout(function() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      openCards[0].classList.add("match");
      openCards[1].classList.add("match");
      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);
    } else {
      openCards[0].classList.remove("open", "show", "unclick");
      openCards[1].classList.remove("open", "show", "unclick");
    }
    openCards = [];
  }, 500);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Timer functionality
// snippet from Stack Overflow https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
function timeInterval() {
  setInterval(timer, 1000);
}

function timer() {
  totalSeconds++;
  seconds.innerHTML = pad(totalSeconds % 60);
  minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Winning the game logic
function winGame() {
  if (matchedCards.length == 2) {
    console.log("winning");
    modal.style.display = "block";
  }
}
winGame();
// Modal functionality
// on win, modal pops up
