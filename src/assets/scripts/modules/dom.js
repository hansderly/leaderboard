import { addScore, getScores } from './api.js';

const form = document.querySelector('#form');

const { username, score } = form.elements;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const usernameValue = username.value;
  const scoreValue = +score.value;
  addScore(usernameValue, scoreValue);
  form.reset();
});
