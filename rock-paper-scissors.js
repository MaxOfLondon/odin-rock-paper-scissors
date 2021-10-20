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

getPlayerInput = () => {
    let valid = false;
    while(true) {
        choice = capitalizeHelper(prompt('Enter what to play: Rock, Paper or Scissors: ', ''));
        if(choice === null) {
            return `You cancelled the game.`;
        } else if(choice == 'Rock' || choice == 'Paper' || choice == 'Scissors') {
            return choice;
        } else {
            alert(`I do not understand what '${choice}' is.`);
        }
    }
}

game = () => {
    let playeWinCount = 0;
    let computerWinCount = 0;

    for(let i = 0; i < 5; i++) {
        let playerInput = getPlayerInput();
        if(playerInput.includes('cancelled')){
            console.log(playerInput);
            return;
        }

        let roundResult = playRound(playerInput, computerPlay());
        console.log(`* Game ${i + 1}: ${roundResult}`);
        if(roundResult.includes('Win')) {
            playeWinCount++;
        } else if (roundResult.includes('Lose')) {
            computerWinCount++;
        }
    }

    if(playeWinCount > computerWinCount) {
        return `You won the game ${playeWinCount}:${computerWinCount}.`;
    } else if(computerWinCount > playeWinCount) {
        return `Computer won the game ${computerWinCount}:${playeWinCount}.`;
    } else {
        return `The was a tie.`;
    }
}

capitalizeHelper = (text) => {
    if(text === null) return null;
    return text.charAt(0).toUpperCase() + text.slice(-text.length +1).toLowerCase();
}

console.log(game());