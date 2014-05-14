Potential Bugs
---------------
-When a user creates a game, the user could join his own game.  Unlikely because the app would redirect you to the next page, but consider guarding against it.

Known Bugs
-----------
-Two users with the same name joining the same game
-Can we detect when a user leaves the waiting room so it updates that database and the front end?  There's a danger of the user pressing the back button and rejoining the game room (two copies of the user in the database).