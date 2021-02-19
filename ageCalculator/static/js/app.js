// Challange 1: Your Age in Days

let date = new Date();
let year = date.getFullYear();

const ageInDays = () => {
  let birthYear = prompt('What year were you born... Good friend?');
  let ageInDays = (year - birthYear) * 365;
  let h1 = document.createElement('h1');
  let testAnswer = document.createTextNode(`You are ${ageInDays} days old!`);
  h1.setAttribute('id', 'ageInDays');
  h1.appendChild(testAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
};

const reset = () => {
    document.getElementById('ageInDays').remove();
}

document.querySelector('#age-btn').addEventListener('click', () => {
  ageInDays();
});


document.querySelector('#age-reset-btn').addEventListener('click', () => {
    reset();
  });