var debugMode = true;


/*debug - console logs up to 2 strings if debugMode flag is set to true */
function debug(description, info) {

	if(debugMode) {
		if (info) console.log(description, info);
		else console.log(description);
	}
	
}

debug("game.js");

var playerName = "";
var playerId = 0;

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
		return;
	}
	else {
		
		var p1 = snapshot.val().player1;
		var p2 = snapshot.val().player2;

		debug("onValue p1:", p1);
		debug("onValue p2:", p2);

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
	$("#sign-in-alert").toggleClass("alert-warning alert-success");
	$(".sign-in").remove();
	

	/*
	 determine player id and then set the player name ....
	 - check if player 1 in db is empty (then player 1)
	 - else if player 2 empty, then player 2
	 -else game is booked
	 
	 may need to move toggle functions to on Value
	 */


      database.ref().set({
        player1: playerName
      });
     $("#sign-in-row").append("<p>Hi <span class='label label-success'>" + playerName + "</span> ! You are player " + playerId + ".</p>");
      
	$("#player-1-waiting").toggle();
	$("#player-1-panel").toggleClass("panel-warning panel-info");
	$("#player-1-choices").toggle();
	$("#player-1-score").toggle();
	

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
	$("#player-1-choices").toggle();
	$("#player-2-choices").toggle();
	$("#player-1-score").toggle();
	$("#player-2-score").toggle();
	
}

/*
database.ref().remove();

add clear or restart button to clear the firebase db
*/

