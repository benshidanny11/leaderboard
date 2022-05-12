/* eslint-disable no-restricted-globals */
const Game = {
  createGame: async (url) => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ name: 'Kings on palace game' }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('mGameId', JSON.stringify(data.result));
      }).catch(() => {
      });
  },
  fetchScores: async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      const data = await response.json();
      return await data.result;
    } catch (e) {
      return e.message;
    }
  },
  addScrore: async (url) => {
    const btnSub = document.getElementById('btn-sub');
    btnSub.addEventListener('click', async () => {
      const user = document.getElementById('name').value;
      const score = document.getElementById('score').value;

      if (user.length === '' || score.length === '') {
        return;
      }

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ user, score }),
      })
        .then((response) => response.json())
        .then(() => {
          document.getElementById('name').value = '';
          document.getElementById('score').value = '';
          location.reload();
        }).catch(() => {
        });
    });
  },
  populateData: (scores) => {
    const listVew = document.querySelector('#list');

    scores.forEach((score) => {
      const listItem = document.createElement('li');
      listItem.classList.add('listitem');
      listItem.innerHTML = `${score.user}: ${score.score}`;
      listVew.appendChild(listItem);
    });
  },
  setFirstTime: () => {
    if (!JSON.parse(localStorage.getItem('GameAleadyExist'))) {
      localStorage.setItem('GameAleadyExist', JSON.stringify(true));
    }
  },
  getGameID: () => {
    const gameID = localStorage.getItem('mGameId') || '';
    const regEx = /[\w]{20}/;
    const data = gameID.match(regEx);
    return data[0].toString();
  },
};

export default Game;
