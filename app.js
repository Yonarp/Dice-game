/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, gamePlaying, prevScore, win_score;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
prevScore = 0;
win_score = 100;

//Adjusting The Default Display To 0

newGame();

function nextPlayer() {
    //Displaying The Score
    roundScore = 0;
    //Next Player

    if (activePlayer === 1) {
        activePlayer = 0;
    } else activePlayer = 1;

    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".player-0-panel").classList.toggle("active");
}

function newGame() {
    //To Reset The The Game
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevScore = 0;
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice-2").style.display = "none";
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".winning-score").value = "Put Win Score Here";
}

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // If Player Take Out 2 consecutive 6's Delete The Entire Score

        if (prevScore === 6 && dice === 6) {
            scores[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent =
                scores[activePlayer];
            nextPlayer();
        } else {
            prevScore = dice;

            //2.Display The Number

            var diceDom = document.querySelector(".dice");
            var diceDom2 = document.querySelector(".dice-2");
            diceDom.style.display = "block";
            diceDom.src = "dice-" + dice + ".png";
            diceDom2.style.display = "block";
            diceDom2.src = "dice-" + dice2 + ".png";

            //3 only If != 1 Update The Score

            if (dice === 1 || dice2 === 1) {
                nextPlayer();
            } else {
                //Add Score

                roundScore += dice + dice2;
                document.querySelector(
                    "#current-" + activePlayer
                ).textContent = roundScore;
            }
        }
    }
    //1. Random Number
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById("score-" + activePlayer).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= win_score) {
            document.getElementById("name-" + activePlayer).textContent = "WINNER";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice-2").style.display = "none";
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");
            gamePlaying = false;
        } else {
            //End The Turn Of Active Player
            nextPlayer();
        }
    }
    // Add Current Score To Total

    //Check If Player Won The Game
});
document.querySelector(".btn-new").addEventListener("click", newGame);
document.querySelector(".btn-reg").addEventListener("click", function() {
    win_score = document.querySelector(".winning-score").value;
});

/* 
1. Player looses his entire score when he rolls two 6 in a row.After it its the next players turn 
2. Add An Input Field so that players can add a winning score    
*/