document.addEventListener('DOMContentLoaded', () => {
    // Select loading screen element
    const loadingScreen = document.getElementById('loading-screen');

    // Function to hide loading screen
    function hideLoadingScreen() {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Fade out animation duration
    }

    // Selecting necessary elements from the DOM
    const mainMenu = document.getElementById('main-menu');
    const gameContainer = document.getElementById('game-container');
    const keyboardContainer = document.getElementById('keyboard-container');
    const leaderboard = document.getElementById('leaderboard');
    const playButton = document.getElementById('play-button');
    const leaderboardButton = document.getElementById('leaderboard-button');
    const backButton = document.getElementById('back-button');
    const mainMenuButton = document.getElementById('main-menu-button');
    const playerNameInput = document.getElementById('player-name');
    const resetButton = document.getElementById('reset-button');
    const wordDisplay = document.getElementById('word-display');
    const wordInput = document.getElementById('word-input');
    const timeLeftDisplay = document.getElementById('time-left');
    const scoreDisplay = document.getElementById('score');
    const leaderboardList = document.getElementById('leaderboard-list');
    const keys = document.querySelectorAll('.key');

    // Game variables
    let timeLeft = 60;
    let score = 0;
    
    let gameInterval;
    let playerName = '';
    let leaderboardScores = JSON.parse(localStorage.getItem('leaderboardScores')) || [];
    let gameInProgress = false;
    const words = [
        'javascript', 'typing', 'game', 'challenge', 'programming', 'coding', 'developer', 'software',
        'network', 'innovation', 'device', 'technology', 'intelligence', 'bot', 'language', 'master',
        'snippet', 'variable', 'query', 'constant', 'function', 'display', 'block', 'element', 'cyber',
        'container', 'interval', 'document', 'html', 'cascading', 'file'
    ];

    // Function to show the main menu
    function showMainMenu() {
        mainMenu.style.display = 'block';
        gameContainer.style.display = 'none';
        leaderboard.style.display = 'none';
        keyboardContainer.style.display = 'none';
        resetGame();
    }

    // Function to show the game screen
    function showGame() {
        playerName = playerNameInput.value.trim();
        if (!playerName) {
            showAlert('Please enter your name to play the game.');
            return;
        }

        mainMenu.style.display = 'none'
        gameContainer.style.display = 'none';
        DisplayContainer.style.display = 'none';
        DirectContainer.style.display = 'block'
        gameContainer.style.display = 'block';
        leaderboard.style.display = 'none';
        keyboardContainer.style.display = 'block';
        startGame();
    }

    // Function to display custom alert
    function showAlert(message) {
        const alertMessage = document.getElementById('alert-message');
        alertMessage.textContent = message;
        const customAlert = document.getElementById('custom-alert');
        customAlert.style.display = 'block';

        // Close alert button event listener
        const closeAlertButton = document.getElementById('close-alert');
        closeAlertButton.addEventListener('click', () => {
            customAlert.style.display = 'none';
        });
    }

    // Function to show the leaderboard screen
    function showLeaderboard() {
        mainMenu.style.display = 'none';
        gameContainer.style.display = 'none';
        leaderboard.style.display = 'block';
        keyboardContainer.style.display = 'none';
        displayLeaderboard();
    }

    // Function to start the game
    function startGame() {
        resetGame();
        gameInProgress = true;
        wordInput.disabled = false;
        wordInput.focus();
        scoreDisplay.textContent = score;
        timeLeftDisplay.textContent = timeLeft;
        showNewWord();
        gameInterval = setInterval(updateGame, 1000);
    }

    // Function to update game timer
    function updateGame() {
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft;
        } else {
            clearInterval(gameInterval);
            endGame();
        }
    }

    // Function to display a new word
    function showNewWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.textContent = words[randomIndex];
        wordInput.value = '';
    }

    // Function to check input word against displayed word
    function checkInput() {
        if (!gameInProgress) return;
        if (wordInput.value === wordDisplay.textContent) {
            score++;
            scoreDisplay.textContent = score;
            showNewWord();
        }
    }

    // Function to end the game
    function endGame() {
        gameInProgress = false;
        wordDisplay.textContent = 'Game Over';
        wordInput.disabled = true;
        wordInput.style.display = 'none';
        saveScore(playerName, score);
    }

    // Function to save player's score to leaderboard
    function saveScore(name, score) {
        leaderboardScores.push({ name, score });
        leaderboardScores.sort((a, b) => b.score - a.score);
        leaderboardScores = leaderboardScores.slice(0, 5);
        localStorage.setItem('leaderboardScores', JSON.stringify(leaderboardScores));
    }

    function displayLeaderboard() {
    leaderboardList.innerHTML = '';
    leaderboardScores.forEach((entry, index) => {
        const li = document.createElement('li');

        const badge = document.createElement('span');
        badge.classList.add('badge');

        const badgeImage = document.createElement('img');
        if (index === 0) {
            badge.classList.add('first');
            badgeImage.src = 'images/first.png'; // Update with correct path
            badgeImage.alt = 'first';
        } else if (index === 1) {
            badge.classList.add('second');
            badgeImage.src = 'images/second.png'; // Update with correct path
            badgeImage.alt = 'second';
        } else if (index === 2) {
            badge.classList.add('third');
            badgeImage.src = 'images/third.png'; // Update with correct path
            badgeImage.alt = 'third';
        } else if (index === 3) {
            badge.classList.add('fourth');
            badgeImage.src = 'images/fourth.png'; // Update with correct path
            badgeImage.alt = 'fourth';
        } else if (index === 4) {
            badge.classList.add('fifth');
            badgeImage.src = 'images/fifth.png'; // Update with correct path
            badgeImage.alt = 'fifth';
        }

        badge.appendChild(badgeImage);
        li.appendChild(badge);
        li.appendChild(document.createTextNode(` ${entry.name}: ${entry.score}`));
        leaderboardList.appendChild(li);
    });
}

    // Function to reset leaderboard
    function resetLeaderboard() {
        localStorage.removeItem('leaderboardScores');
        leaderboardScores = [];
        displayLeaderboard();
    }

    // Function to reset game variables
    function resetGame() {
        clearInterval(gameInterval);
        timeLeft = 60;
        score = 0;
        scoreDisplay.textContent = score;
        timeLeftDisplay.textContent = timeLeft;
        wordInput.value = '';
        wordInput.disabled = false;
        wordInput.style.display = 'block';
    }

    // Function to handle keyboard button clicks
    function handleKeyPress(event) {
        if (!gameInProgress) return;

        const key = event.target;
        const keyValue = key.textContent;

        if (key.classList.contains('backspace')) {
            wordInput.value = wordInput.value.slice(0, -1);
        } else {
            wordInput.value += keyValue;
        }

        checkInput();
    }

    // Event listeners for UI interactions
    playButton.addEventListener('click', showGame);
    leaderboardButton.addEventListener('click', showLeaderboard);
    backButton.addEventListener('click', showMainMenu);
    mainMenuButton.addEventListener('click', showMainMenu);
    resetButton.addEventListener('click', resetLeaderboard);
    wordInput.addEventListener('input', checkInput);
    keys.forEach(key => key.addEventListener('click', handleKeyPress));

    // Initially hide game and leaderboard screens
    gameContainer.style.display = 'none';
    leaderboard.style.display = 'none';

    // Simulate a loading delay and then hide loading screen
    setTimeout(() => {
        hideLoadingScreen();
        showMainMenu();
    }, 1000); // Simulate a 1-second loading time with fade-out animation
});