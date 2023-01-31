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

const refresh = async () => {
  const { status, data } = await getScores();
  if (status !== 200) return null;

  const leadList = document.querySelector('.leadList');
  const fragment = document.createDocumentFragment();
  data.result.forEach((el) => {
    const lead = document.createElement('li');
    lead.innerText = `${el.user}: ${el.score}`;
    fragment.appendChild(lead);
  });
  return leadList.appendChild(fragment);
};

refreshBtn.addEventListener('click', () => refresh());