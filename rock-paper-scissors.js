computerPlay = () => {
    const assets = ['Rock', 'Paper', 'Scissors'];
    const r = Math.floor(Math.random()*3);
    return assets[r];
}

playRound = (playerSelection, computerSelection) => {
    const playerWin = (playerSelection == "Rock" && computerSelection == "Scissors")
                || (playerSelection == "Paper" && computerSelection == "Rock")
                || (playerSelection == "Scissors" && computerSelection == "Paper");
    const tie = playerSelection == computerSelection;

    if(playerWin) {
        return `You Win! ${playerSelection} beats ${computerSelection}.`;
    } else if(tie) {
        return `Tie! Both played ${playerSelection}.`;
    } else {
        return `You Lose! ${computerSelection} beats ${playerSelection}.`;
    }
}

evalGameScore = () => {
    if (playerWinCnt.cnt < 5 && computerWinCnt.cnt < 5) return '';
    if(playerWinCnt.cnt > computerWinCnt.cnt) {
        return `You won the game ${playerWinCnt.cnt}:${computerWinCnt.cnt}.`;
    } else if(computerWinCnt.cnt > playerWinCnt.cnt) {
        return `Computer won the game ${computerWinCnt.cnt}:${playerWinCnt.cnt}.`;
    } else {
        return `The was a tie.`;
    }
}

capitalizeHelper = (text) => {
    if(text === null) return null;
    return text.charAt(0).toUpperCase() + text.slice(-text.length +1).toLowerCase();
}

adjustRoundScore = (text) => {
    if (text.includes('Win')) {
        playerWinCnt.inc();
    } else if (text.includes('Lose')) {
        computerWinCnt.inc();
    }
}

updateUi = (text) => {
    const results = document.querySelector('.results');
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(`${text}`));
    results.prepend(p);

    // update scores
    const ps = document.querySelector('.player-score');
    const cs = document.querySelector('.comp-score');
    ps.innerText = playerWinCnt.cnt;
    cs.innerText = computerWinCnt.cnt;
}

class Counter {
    cnt = 0;
    inc = () => { this.cnt++; console.dir(this.cnt); return this.cnt;};
    rst = () => { this.cnt = 0; return this.cnt;}
 };
let playerWinCnt = new Counter();
let computerWinCnt = new Counter();
let round = 1;

const player = document.querySelectorAll('.player');

player.forEach((button) => {
    button.addEventListener('click', (e)=>{
        const res = playRound(e.target.innerText, computerPlay());
        adjustRoundScore(res);
        updateUi(`Round ${round} - ${res}`);
        round++
        const gameScore = evalGameScore();
        if (gameScore != '') {
            updateUi(gameScore);
            computerWinCnt.rst();
            playerWinCnt.rst();
            round = 1;
        }
    })
});