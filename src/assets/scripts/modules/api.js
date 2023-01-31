import axios from 'axios';

const id = 'UbAs6MKSMlOhiBPbmRvp';
const baseURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
const config = {
  headers: {
    'content-type': 'application/json',
  },
};

const addScore = async (user, score) => {
  const dataPost = JSON.stringify({ user, score });
  try {
    const { data } = await axios.post(baseURL, dataPost, config);
    return data;
  } catch (error) {
    return error;
  }
};

const getScores = () => {};

export { addScore, getScores };
