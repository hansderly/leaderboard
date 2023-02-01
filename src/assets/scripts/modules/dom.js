import { addScore, getScores } from './api.js';

const form = document.querySelector('#form');
const refreshBtn = document.querySelector('#refreshBtn');

const { username, score } = form.elements;

const createHtml = (id, user, score) => (`
   <span class="big">${typeof id === 'number' ? id + 1 : ''}</span>
      <div class="img-name">
        <img class="avatar" src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="avatar">
        <span>${user}</span>
      </div>
    <span class="big">${score} pts</span>
  `);

const addToDOM = (user, score) => {
  console.log(user, score)
  const newlead = document.createElement('li');
  newlead.innerHTML = createHtml('', user, score);
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

  data.result = data.result.sort((a, b) => b.score - a.score);

  const leadList = document.querySelector('.leadList');
  const fragment = document.createDocumentFragment();
  leadList.innerHTML = '';
  data.result.forEach((el, id) => {
    const lead = document.createElement('li');
    lead.innerHTML = createHtml(id, el.user, el.score);
    fragment.appendChild(lead);
  });
  return leadList.appendChild(fragment);
};

refreshBtn.addEventListener('click', () => refresh());
