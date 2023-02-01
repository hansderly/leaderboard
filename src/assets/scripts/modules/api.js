import axios from 'axios';

const id = '2AWq5aBevBN0hSte2b4S';
const baseURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
const config = {
  headers: {
    'content-type': 'application/json',
  },
};

const addScore = async (user, score) => {
  const dataPost = JSON.stringify({ user, score });
  try {
    const { data, status } = await axios.post(baseURL, dataPost, config);
    return { status, data };
  } catch (error) {
    return error;
  }
};

const getScores = async () => {
  try {
    const { data, status } = await axios.get(baseURL);
    return { status, data };
  } catch (error) {
    return error;
  }
};

export { addScore, getScores };
