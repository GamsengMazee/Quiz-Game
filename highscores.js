const highScoresList = document.getElementById('highscores');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []; //empty array if its return nothing


  highScoresList.innerHTML =  highScores.map(score => {
        return `<li class= 'high_score'>${score.name} - ${score.score}</li>`;
    }).join('')
