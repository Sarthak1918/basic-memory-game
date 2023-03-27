let count = 0;
let firstSelection = "";
let secondSelection = "";
let countDownStarted = false;
let gameEnded = false;
let currentTime = 0;

function mapTime() {
  ++currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  return `${`${minutes}`.padStart(2, "0")}:${`${seconds}`.padStart(2, "0")}`;
}


function startCountDown() {
  if (countDownStarted && !gameEnded) {
    document.getElementById("timer").innerHTML = mapTime();
    setTimeout(startCountDown, 1000);
  }
}

const cards = document.querySelectorAll(".item");

function resetGame() {
  countDownStarted = false;
  gameEnded = false;
  document.getElementById("timer").innerHTML = "00:00";
  cards.forEach((e)=>{
    e.classList.remove("clicked")
    e.classList.remove("correct")
    e.classList.remove("shake")
    e.classList.remove("non-clickable")
  })
}

cards.forEach((card) => {
  card.addEventListener("click", function () {
    if (gameEnded) {
      return;
    }
    card.classList.add("clicked");

    if (!countDownStarted) {
      countDownStarted = true;
      startCountDown();
    }
    if (count === 0) {
      firstSelection = card.getAttribute("animal");
      card.classList.add("non-clickable")
      count++;
    } else {
      secondSelection = card.getAttribute("animal");
      count = 0;

      if (firstSelection === secondSelection) {
        let correctCards = document.querySelectorAll(".clicked");

        correctCards[0].classList.add("correct");
        correctCards[0].classList.remove("clicked");
        correctCards[1].classList.add("correct");
        correctCards[1].classList.remove("clicked");
        correctCards[0].classList.add("non-clickable");
        correctCards[1].classList.add("non-clickable");
      } else {
        let WrongCards = document.querySelectorAll(".clicked");
        WrongCards[0].classList.remove("non-clickable");
        WrongCards[1].classList.remove("non-clickable");

        WrongCards[0].classList.add("shake");
        WrongCards[1].classList.add("shake");

        setTimeout(() => {
          WrongCards[0].classList.remove("shake");
          WrongCards[0].classList.remove("clicked");
          WrongCards[1].classList.remove("shake");
          WrongCards[1].classList.remove("clicked");
        }, 300);
      }

      let correctCount = 0;

      cards.forEach((e) => {
        if (e.classList.contains("correct")) {
          correctCount++;
        }
      });
      if (correctCount === cards.length) {
        gameEnded = true;
        document.getElementById("result").style.display=""
      }
    }
  });

  

});
