const userName = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore')

const  MAX_HIGH_SCORES = 5;
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//disable user form clicking on save button when input field is empty
userName.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !userName.value;
})

saveHighScore = (e) => {
    e.preventDefault();
    const score = {
      score: mostRecentScore,
      name: userName.value,
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('/');
    console.log(highScores)
    
}

