import Game from './modules/game.mjs';

const GAME_PREFIX = 'game_';

function saveGame(game) {
    if (!(game instanceof Game)) {
        console.error("saveGame: not a game instance");
        return;
    }
    localStorage.setItem(GAME_PREFIX + game.title, JSON.stringify(game));
}

function loadAllGames() {
    const games = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(GAME_PREFIX)) {
            const data = JSON.parse(localStorage.getItem(key));
            games.push(new Game(data));
        }
    }
    return games;
}

function exportGamesToJSON() {
    const games = loadAllGames();
    return JSON.stringify(games, null, 2);
}

function importGamesFromJSON(json) {
    let parsed;
    try {
        parsed = JSON.parse(json);
    } catch (error) {
        console.error("Invalid JSON", error);
        return;
    }

    if (Array.isArray(parsed)) {
        parsed.forEach(data => {
            const game = new Game(data);
            saveGame(game);
        });
    } else {
        console.error("JSON must be an array of games");
    }
}

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

