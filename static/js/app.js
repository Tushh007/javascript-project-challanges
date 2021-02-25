// Challange 1: Your Age in Days
let date = new Date();
let year = date.getFullYear();

const ageInDays = () => {
  let birthYear = prompt('What year were you born... Good friend?');
  if (birthYear !== null) {
    if (birthYear.length >= 4) {
      let ageInDays = (year - birthYear) * 365;
      let h1 = document.createElement('h1');
      let testAnswer = document.createTextNode(
        `You are ${ageInDays} days old!`
      );
      h1.setAttribute('id', 'ageInDays');
      h1.appendChild(testAnswer);
      document.getElementById('flex-box-result').appendChild(h1);
    }
  }
};

const reset = () => {
  const ageDiv = document.getElementById('ageInDays');
  if (ageDiv !== null) ageDiv.remove();
};

document.querySelector('#age-btn').addEventListener('click', () => {
  ageInDays();
});

document.querySelector('#age-reset-btn').addEventListener('click', () => {
  reset();
});

// Challange 2: Cat Generator
const generateCat = () => {
  let image = document.createElement('img');
  let div = document.getElementById('flex-cat-gen');
  image.src =
    'https://thecatapi.com/api/images/get?format=src&type=gif&size=small';
  div.appendChild(image);
};

document.querySelector('#cat-gen-btn').addEventListener('click', () => {
  generateCat();
});

// Challange 3: Rock, Paper, Scissor Game
const repsFrontEnd = (playerChoice, computerChoice, result) => {
  let imagesDatabase = {
    rock: document.getElementById('rock').src,
    paper: document.getElementById('paper').src,
    scissor: document.getElementById('scissor').src,
  };

  // remove all the images
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissor').remove();

  // generate div for results
  const playerDiv = document.createElement('div');
  const botDiv = document.createElement('div');
  const messageDiv = document.createElement('div');

  // setting div data
  playerDiv.innerHTML = `<img src='${imagesDatabase[playerChoice]}' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>`;
  botDiv.innerHTML = `<img src='${imagesDatabase[computerChoice]}' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>`;
  messageDiv.innerHTML = `<h1 style='color: ${result['color']}; font-size: 60px; padding: 30px;'>${result['message']}</h1>`;

  document.getElementById('flex-box-rps-div').appendChild(playerDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
};
const finalMessage = ([yourScore, botScore]) => {
  if (yourScore === 0) return { message: 'You lost!', color: 'red' };
  else if (yourScore === 0.5) return { message: 'You tied!', color: 'yellow' };
  else if (yourScore === 1) return { message: 'You won!', color: 'green' };
  else console.log('no more conditions!');
};

const decideWinner = (yourChoice, botChoice) => {
  let rpsDatabase = {
    rock: { scissor: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissor: 0 },
    scissor: { paper: 1, scissor: 0.5, rock: 0 },
  };

  // Scores
  let yourScore = rpsDatabase[yourChoice][botChoice];
  let botScore = rpsDatabase[botChoice][yourChoice];

  return [yourScore, botScore];
};

const botChoice = () => {
  let choices = ['rock', 'paper', 'scissor'];
  return choices[Math.floor(Math.random() * choices.length)];
};

const rpsGame = (yourChoice) => {
  const computerChoice = botChoice();
  const result = decideWinner(yourChoice, computerChoice);
  const message = finalMessage(result);
  repsFrontEnd(yourChoice, computerChoice, message);
};

document.querySelector('#rock').addEventListener('click', () => {
  rpsGame('rock');
});

document.querySelector('#paper').addEventListener('click', () => {
  rpsGame('paper');
});

document.querySelector('#scissor').addEventListener('click', () => {
  rpsGame('scissor');
});

// Challange 4: Change the color of all the buttons
const allButtons = document.getElementsByTagName('button');
let previousButtonState = [];
for (let buttons of allButtons) previousButtonState.push(buttons.classList[1]);

const buttonsRed = () => {
  for (let buttons of allButtons) {
    buttons.classList.remove(buttons.classList[1]);
    buttons.classList.add('btn-danger');
  }
};

const buttonsGreen = () => {
  for (let buttons of allButtons) {
    buttons.classList.remove(buttons.classList[1]);
    buttons.classList.add('btn-success');
  }
};

const buttonsRandom = () => {
  let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
  for (let i = 0; i < allButtons.length; i++) {
    let randomButton = choices[Math.floor(Math.random() * choices.length)];
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(randomButton);
  }
};

const buttonsReset = () => {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove(allButtons[i].classList[1]);
    allButtons[i].classList.add(previousButtonState[i]);
  }
};

const buttonColorChange = (color) => {
  if (color === 'red') buttonsRed();
  else if (color === 'green') buttonsGreen();
  else if (color === 'random') buttonsRandom();
  else if (color === 'reset') buttonsReset();
  else console.log('no more conditions');
};

document.querySelector('#background').addEventListener('change', (e) => {
  buttonColorChange(e.target.value);
});

// Challange 5: BlackJack Game
let blackjackGame = {
  you: { scoreSpan: '#your-blackjack-result', div: '#your-box', score: 0 },
  dealer: {
    scoreSpan: '#dealer-blackjack-result',
    div: '#dealer-box',
    score: 0,
  },
  cards: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
  cardsMap: {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'K': 10,
    'J': 10,
    'Q': 10,
    'A': [11, 1],
  },
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('./static/assets/sounds/swish.m4a');
const winSound = new Audio('./static/assets/sounds/cash.mp3');
const lossSound = new Audio('./static/assets/sounds/aww.mp3');

const showResult = (winner) => {
  let message, messageColor;

  if (blackjackGame['turnsOver'] === true) {
    if (winner === YOU) {
      document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = 'You won!';
      messageColor = 'green';
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You lost!';
      messageColor = 'red';
      lossSound.play();
    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You drew';
      messageColor = 'black';
    }
  
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
};

const computeWinner = () => {
  let winner;
  if (YOU['score'] <= 21) {
    if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
      blackjackGame['wins']++;
      winner = YOU;
    } else if (YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++;
      winner = DEALER;
    } else if (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++;
    }
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++;
    winner = DEALER;
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++;
  }
  return winner;
};

const showScore = (activePlayer) => {
  if (activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
    document.querySelector(activePlayer['scoreSpan']).textContent =
      activePlayer['score'];
  }
};

const updateScore = (card, activePlayer) => {
  if (card === 'A') {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
};

const showCard = (card, activePlayer) => {
  if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `./static/assets/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
  }
};

const randomCard = () => {
  const randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
};

const hit = () => {
  if (blackjackGame['isStand'] === false) {
    const card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
};

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const dealer = async () => {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    const card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }
  
  blackjackGame['turnsOver'] = true;
  let winner = computeWinner();
  showResult(winner);
}

const deal = () => {
  if (blackjackGame['turnsOver'] === true) {
    blackjackGame['isStand'] = false;
    let yourCards = document.querySelector('#your-box').querySelectorAll('img');
    let dealerCards = document
      .querySelector('#dealer-box')
      .querySelectorAll('img');
    for (let card of yourCards) card.remove();
    for (let card of dealerCards) card.remove();

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = '#ffffff';

    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent = `Let's play`;
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = false;
  }
};

document
  .querySelector('#blackjack-hit-button')
  .addEventListener('click', () => {
    hit();
  });

document
  .querySelector('#blackjack-stand-button')
  .addEventListener('click', () => {
    dealer();
  });

document
  .querySelector('#blackjack-deal-button')
  .addEventListener('click', () => {
    deal();
  });
