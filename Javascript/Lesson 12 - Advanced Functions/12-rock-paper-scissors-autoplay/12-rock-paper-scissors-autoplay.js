
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

function decideWinner(playerMove, computerMove)
{
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }
  return result;
}

function updateScore(result)
{
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));
}

function updateDisplay(result, playerMove, computerMove)
{
  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
  <img src="../images/${playerMove}-emoji.png" class="move-icon">
  <img src="../images/${computerMove}-emoji.png" class="move-icon">
  Computer`;
}

function playGame(playerMove) {
  const computerMove = selectRandomMove();
  // const playerMove = selectMove();
  let result = '';
  //console.log(`Player Move: ${playerMove}`);
  result = decideWinner(playerMove, computerMove);
  updateScore(result);
  updateScoreElement();
  updateDisplay(result, playerMove, computerMove);
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function selectRandomMove() {
  const randomNumber = Math.random();

  let move = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    move = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    move = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    move = 'scissors';
  }

  return move;
}

let isAutoPlaying = false;
let intervalId;

function autoplay()
{
  if(!isAutoPlaying)
  {
    intervalId = setInterval(() => {
      console.log('Autoplay Game');
      playerMove = selectRandomMove();
      playGame(playerMove);
    }, 3000);
    isAutoPlaying = true;
  }
  else
  {
    isAutoPlaying = false;
    clearInterval(intervalId);
  }
}

