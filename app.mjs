import Game from './models/Game.js';

const GAME_PREFIX = 'game_';
let games = [];


function saveGame(game) {
    if (!(game instanceof Game)) return;
    localStorage.setItem(GAME_PREFIX + game.title, JSON.stringify(game));
}


function loadAllGames() {
    const loaded = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(GAME_PREFIX)) {
            const data = JSON.parse(localStorage.getItem(key));
            loaded.push(new Game(data));
        }
    }
    return loaded;
}


function exportGamesToJSON() {
    return JSON.stringify(games, null, 2);
}


function importGamesFromJSON(json) {
    try {
        const parsed = JSON.parse(json);
        if (Array.isArray(parsed)) {
            parsed.forEach(data => {
                const game = new Game(data);
                saveGame(game);
            });
            games = loadAllGames();
        }
    } catch (err) {
        console.error("Failed to import games:", err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('importSource');
    if (fileInput) {
        fileInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = event => {
                    importGamesFromJSON(event.target.result);
                };
                reader.readAsText(file);
            }
        });
    }

    games = loadAllGames();
    console.log("Loaded games:", games);
});

/*const sampleGame = new Game({
    "title": "Concordia",
    "designer": "Mac Gerdts",
    "artist": "Marina Fahrenbach",
    "publisher": "PD-Verlag",
    "year": 2013,
    "players": "2–5",
    "time": "90 mins",
    "difficulty": "Medium",
    "url": "https://boardgamegeek.com/boardgame/124361/concordia",
    "playCount": 44,
    "personalRating": 9
});

console.log(sampleGame);
*/
