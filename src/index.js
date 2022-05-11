/* eslint-disable no-restricted-globals */
import './styles/style.css';
import Game from './modules/feature.js';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

document.getElementById('refButton').addEventListener('click', () => {
  location.reload();
});

document.addEventListener('DOMContentLoaded', async () => {
  if (!localStorage.getItem('mGameId')) {
    await Game.createGame(url);
  }
  const scores = await Game.fetchScores(`${url}/${Game.getGameID()}/scores`);
  await Game.addScrore(`${url}/${Game.getGameID()}/scores`);
  Game.populateData(scores);
});