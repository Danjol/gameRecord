import Game from './models/game.mjs';

const gameData = [
    {
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
    },
];

const games = gameData.map(game => new Game(game));

console.log(games);