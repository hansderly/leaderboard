import { addScore, getScores } from './api.js';

const form = document.querySelector('#form');
const refreshBtn = document.querySelector('#refreshBtn');

const { username, score } = form.elements;

const addToDOM = (user, score) => {
  const newlead = document.createElement('li');
  newlead.innerText = `${user}: ${score}`;
  document.querySelector('.leadList').appendChild(newlead);
};

const addScoreHandler = async (user, score) => {
  const { status } = await addScore(user, score);
  if (status === 201) addToDOM(user, score);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameValue = username.value;
  const scoreValue = +score.value;
  addScoreHandler(usernameValue, scoreValue);
  form.reset();
});

refreshBtn.addEventListener('click', () => getScores());