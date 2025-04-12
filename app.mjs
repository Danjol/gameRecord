import Game from './modules/game.mjs';

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
            renderGames();
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
    renderGames();
});

function renderGames() {
    const container = document.getElementById('gameList');
    container.innerHTML = '';

    games.forEach((game, index) => {
        const wrapper = document.createElement('div');
        wrapper.style.border = '1px solid #ccc';
        wrapper.style.padding = '10px';
        wrapper.style.marginBottom = '20px';
        wrapper.style.borderRadius = '8px';

        wrapper.innerHTML = `
            <h2>${game.title}</h2>
            <p><strong>Year:</strong> ${game.year} &nbsp; <strong>Players:</strong> ${game.players} &nbsp; <strong>Time:</strong> ${game.time} &nbsp; <strong>Difficulty:</strong> ${game.difficulty}</p>
            <p style="margin-left: 20px;">
                <strong>Designer:</strong> ${game.designer}<br>
                <strong>Artist:</strong> ${game.artist}<br>
                <strong>Publisher:</strong> ${game.publisher}<br>
                <strong>BGG Listing:</strong> <a href="${game.url}" target="_blank">${game.url}</a>
            </p>
            <p>
                <strong>Playcount:</strong> <span>${game.playCount}</span>
                <button class="increasePlay" data-index="${index}">+</button>
            </p>
            <p>
                <strong>Rating:</strong>
                <input type="range" min="0" max="10" step="1" value="${game.personalRating}" data-index="${index}">
                <span>${game.personalRating}</span>
            </p>
            <button class="deleteGame" data-title="${game.title}">Delete</button>
        `;

        container.appendChild(wrapper);
    });

    const deleteButtons = document.querySelectorAll('.deleteGame');
    deleteButtons.forEach(button => {
        button.addEventListener('click', e => {
            const title = e.target.getAttribute('data-title');
            localStorage.removeItem(GAME_PREFIX + title);
            games = games.filter(g => g.title !== title);
            renderGames();
        });
    });
}

    document.querySelectorAll('.addPlayBtn').forEach(button => {
        button.addEventListener('click', () => {
            const title = button.dataset.title;
            const game = games.find(g => g.title === title);
            if (game) {
                game.playCount += 1;
                document.getElementById(`playCount_${title}`).textContent = game.playCount;
                saveGame(game);
            }
        });
    });

    document.querySelectorAll('.ratingSlider').forEach(slider => {
        slider.addEventListener('input', () => {
            const title = slider.dataset.title;
            const game = games.find(g => g.title === title);
            if (game) {
                const newRating = parseInt(slider.value, 10);
                game.personalRating = newRating;
                document.getElementById(`rating_${title}`).textContent = newRating;
                saveGame(game);
            }
        });
    });

const newGameForm = document.getElementById('newGameForm');

if (newGameForm) {
    newGameForm.addEventListener('submit', e => {
        e.preventDefault();
        const gameData = {
            title: document.getElementById('title').value.trim(),
            designer: document.getElementById('designer').value.trim(),
            artist: document.getElementById('artist').value.trim(),
            publisher: document.getElementById('publisher').value.trim(),
            year: parseInt(document.getElementById('year').value),
            players: document.getElementById('players').value.trim(),
            time: document.getElementById('time').value.trim(),
            difficulty: document.getElementById('difficulty').value.trim(),
            url: document.getElementById('url').value.trim(),
            playCount: 0,
            personalRating: 0
        };

        const newGame = new Game(gameData);

        saveGame(newGame);
        games.push(newGame);
        renderGames();
        newGameForm.reset();
    });
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
*/
