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

const botChoice = () =>
  ['rock', 'paper', 'scissor'][Math.floor(Math.random() * 3)];

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
