var debugMode = true;


/*debug - console logs arg(s) if debugMode flag is set to true */
// function debug(description) {

// 	if(debugMode) console.log(description);	
// }
function debug(description, info) {

	if(debugMode) console.log(description, info);
	
}

debug("game.js");

var playerName = "";
var playerId = 0;
var hasPlayer1Joined = false;
var hasPlayer2Joined = false;

var gameData;
var newGame = {
			chat: "",
			player1 : {
				name: "",
				joined: false,
				choice: ""
			},
			player2 : {
				name: "",
				joined: false,
				choice: ""
			},
			turn:0
		}

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBogxEWYvxkxRYHE6ovGQmaVHAHWEQLG4k",
	authDomain: "hw7-rps-game.firebaseapp.com",
	databaseURL: "https://hw7-rps-game.firebaseio.com",
	projectId: "hw7-rps-game",
	storageBucket: "hw7-rps-game.appspot.com",
	messagingSenderId: "651761207073"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("value", function(snapshot) {

	if (snapshot.val() === null) {
		//new game is starting
		debug("snapshot is null");

		database.ref().set(newGame);
		return;
	}
	else {

		console.log(snapshot.val());
		gameData = snapshot.val();

		if(gameData.player1.joined && !gameData.player2.joined && gameData.turn == 0) {
		//new game, and player 1 has joined
			if(playerId == 1) {
			    $("#player-1-waiting").toggle();
				$("#player-1-panel").toggleClass("panel-warning panel-info");
				$("#player-1-choices").toggle();
				$("#player-1-score").toggle();

				$("#sign-in-alert").toggleClass("alert-warning alert-success");
				$(".sign-in").remove();
			    $("#sign-in-row").append("<p>Hi <span class='label label-success'>" + gameData.player1.name + "</span> ! You are player " + playerId + ".</p>");
			}

			if(playerId==0) 
			{
				//second player that hasn't joined yet
				debug("second player that hasn't joined yet")
				$("#player-1-waiting").toggle();
				$("#player-1-joined").toggle();
				$("#player-1-panel").toggleClass("panel-warning panel-success");

			}
		}

		else if(gameData.player1.joined && gameData.player2.joined && gameData.turn ==0) {
			//new game, and player 2 has joined
			if(playerId == 1) {
				debug("second player has joined")
				$("#player-2-waiting").toggle();
				$("#player-2-joined").toggle();
				$("#player-2-panel").toggleClass("panel-warning panel-success");

			}

			if(playerId==2) 
			{
				//second player 
				$("#player-2-waiting").toggle();
				$("#player-2-panel").toggleClass("panel-warning panel-info");
				$("#player-2-choices").toggle();
				$("#player-2-score").toggle();

				$("#sign-in-alert").toggleClass("alert-warning alert-success");
				$(".sign-in").remove();
			    $("#sign-in-row").append("<p>Hi <span class='label label-success'>" + gameData.player2.name + "</span> ! You are player " + playerId + ".</p>");
			}
		}

	}


}, function(errorObject){

	console.log("Errors handled: " + errorObject.code);

});



$(".shape-choice").click(choiceMade);

$("#sign-in").click(function(){
	event.preventDefault();

	debug("#sign-in on-click");
	playerName = $("#name").val().trim();
	debug(playerName);

	

	/*
	 determine player id and then set the player name ....
	 - check if player 1 in db is empty (then player 1)
	 - else if player 2 empty, then player 2
	 -else game is booked
	 
	 may need to move toggle functions to on Value
	 */

	// if gameData.player1.joined and gameData.player2.joined are both false, then no players
	if(!gameData.player1.joined && !gameData.player2.joined) {
		//new game, and this is player 1
		playerId = 1; 
		gameData.player1.joined = true;
		gameData.player1.name = playerName;
		gameData.turn=0;
      	database.ref().set(gameData);


      	
  	}
  	// if gameData.player1.joined is trued and gameData.player2.joined is false, then this is 2nd player
  	else if(gameData.player1.joined && !gameData.player2.joined) {
  		//new game, and this is player 2
  		playerId = 2;
		gameData.player2.joined = true;
		gameData.player2.name = playerName;
      	database.ref().set(gameData);
      	 
  	}

  	else {
    	//something is wrong so alert the user and quit
    	alert('Game is out of sync. Please reset and start again');
    	return;
    }
	
})

function choiceMade(){
	debug("choiceMade()");
	//alert("clicked");
	
}

/* document.ready will initalize the game once the DOM is loaded */
$(document).ready(function() {
	
	debug("document.ready()")

	initalizeGame();

});

function initalizeGame() {

	debug("initalizeGame()");

	//hide game choices until user logs in
	$("#player-1-joined").toggle();
	$("#player-2-joined").toggle();
	$("#player-1-choices").toggle();
	$("#player-2-choices").toggle();
	$("#player-1-score").toggle();
	$("#player-2-score").toggle();
	
}

$("#reset").click(function(){
	
	event.preventDefault();

	database.ref().remove();

	alert("Game has been reset");

});

