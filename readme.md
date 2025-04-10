# gameRecord

Step 1.
I added the basic html lines with references to app.mjs and style.css

Step 2.
I noticed that this one was quite similar to one of the tasks we had in the last exam unit so i used the constructor here as well as on the last assignment and also added a function to make sure "we continue" to the next game on the list.
i also wrote models in the export path instead of modules so i changed that.

during step 3 i also fixed up a bit on some of the variable names

Step 3.
At first, I tried using .map() like (former gameData) sampleGame.map(game => new Game(game)), assuming I was working with an array. But I realized that localStorage doesn't give you an array of games, it's just a bunch of individual key-value pairs. Since .map() only works on arrays, that approach didn't work. So I switched to using a loop that checks each key in localStorage, filters out the ones related to games, and then creates Game objects from that data. It’s a bit more manual, but it fits how localStorage actually works.
I also introduced a games array to hold an in-memory record of all the games. i also ensured the DOM elements were existing before we try to attach listeners. added the file reader. moved loadAllGames call into startup logic so we can update the games array after loading from localStorage and after imports, and added slight adjustments to importGamesFromJSON to ensure newly imported games are stored and reflected in the in-memory array.