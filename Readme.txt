index.html = This is the website file that houses the game, it just loads the scripts into the web browser. To run the game, it needs to be loaded into a web server, then it just requires the URL in a web browser. For development purposes, the game has been run through the “Live Server” Plugin for VS code.
Lines = 20
style.css = file just contains the code to centre the div containing the game
Lines = 3
game.js = The main configuration file for the game engine. It tells the game engine the configuration of the viewport, list of all the other files and makes them accessible to the engine. The file also contains all the global variables for the program, and they can be called from any page. It directs the program to the main menu.
Lines = 132
startup.js = This file contains the script for everything running on the main menu, it builds the GUI and links to the other pages.
Lines = 41
tetris.js = This file is containing the script for the actual game itself. It contains all the GUI, game logic and gameplay script. It draws a lot of variables from the global variables list in the main.js as it is mainly run in the game engines two functions, create(), for static code and, update(), for game engine updates and variables are required to be shared between these two functions.
Lines = 435
settings.js = This file contains the scripts required for the settings page, it creates the GUI of the page and allows the player to select options which are sent to the global variable which are called by the tetris.js later.
Lines = 193
highscores.js = this file displays the top high scores players scored while playing the game, the script creates a GUI, and reads the scores from an external
Lines = 49
highscore.json = this file contains the high scores to be read by the highscore.js script. Not yet fully implemented.
Lines = 16

total lines = 889

Naming Conventions for all variable, classes, objects, and functions are all in camelCase and reflects the function's actions.
