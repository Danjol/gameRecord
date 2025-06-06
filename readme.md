# gameRecord

Step 1.
I added the basic html lines with references to app.mjs and style.css

Step 2.
I noticed that this one was quite similar to one of the tasks we had in the last exam unit so i used the constructor here as well as on the last assignment and also added a function to make sure "we continue" to the next game on the list.
I also wrote models in the export path instead of modules so i changed that.

During step 3 i also fixed up a bit on some of the variable names

Step 3.
At first, I tried using .map() like (former gameData) sampleGame.map(game => new Game(game)), assuming I was working with an array. But I realized that localStorage doesn't give you an array of games, it's just a bunch of individual key-value pairs. Since .map() only works on arrays, that approach didn't work. So I switched to using a loop that checks each key in localStorage, filters out the ones related to games, and then creates Game objects from that data. It’s a bit more manual, but it fits how localStorage actually works.
Step 4.
I also introduced a games array to hold an in-memory record of all the games. i also ensured the DOM elements were existing before we try to attach listeners. added the file reader. moved loadAllGames call into startup logic so i can update the games array after loading from localStorage and after imports, and added slight adjustments to importGamesFromJSON to ensure newly imported games are stored and reflected in the in-memory array.

Step 5.
So from step 4 to step 5, we basically made the file upload actually do something. In step 4, the input was there, but picking a file didn’t trigger anything. So in step 5, we added an event listener to the file input that reads the selected file using a FileReader, parses the JSON inside, and turns each item into a proper Game object. We also save each game to localStorage so the data sticks around, then reload everything and re-render the game list on the page. On top of that, we made sure that when the page loads, any games already saved in localStorage get pulled in and displayed right away. Overall, step 5 just connects all the dots so importing from a file actually works and updates the UI as expected.

Step 6.
Now i've implemented so that clicking the + button increases the game's playcount and updates both the display and localStorage. Moving the rating slider also updates the game's rating in real time and saves it too.

Step 7. 
added a new form containing input fields for game information. also used <hr /> to seperate the form from the game list display.

Step 8.
Now when you submit the form, the game get created as a new Game object. whenever submitted, the game gets saved in localStorage under game_title and also immidiately gets shown in the ui.

Step 9.
I added a delete button for each game so you can remove games from your list. i had to update the renderGames function to include a button for deleting, and wiring up a click event that removes the game from localStorage, updates the in-memory games array, and refreshes the display with renderGames again. i also added (game, index) to the games.forEach loop. even though we didnt need index for deleting, i wanted to add it so that each game gets its own ID based on its spot on the list. all in all, makes my life a bit easier when we want to connect certain buttons to certain games. i also dropped the if (!container) return; to keep the code cleaner since the #gameList element is always supposed to be there now.

Step 10.
i used a <select> dropdown in my code that allows the user to choose a sorting option. when the page loads, it also attaches an event listener to the <select> element (sortGames). when the user changes the selection, it should trigger sortGames and re-render the list. furthermore, the sortGames(by) function sorts the games array based on the selected criteria (players, personalRating, difficulty, or playCount). after sorting, renderGames is called to refresh the UI with the newly ordered list.
