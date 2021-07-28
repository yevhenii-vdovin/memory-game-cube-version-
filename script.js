const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  //second card
  // hasFlippedCard = false;
  secondCard = this;

  // do cards match ?
  // console.log(firstCard.dataset.photo);
  // console.log(secondCard.dataset.photo);
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.photo === secondCard.dataset.photo;
  isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unFlipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((cards) => {
    let randomPos = Math.floor(Math.random() * 16);
    cards.style.order = randomPos;
  });
})();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
