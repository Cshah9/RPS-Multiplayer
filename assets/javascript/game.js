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



$(".shape-choice").click(choiceMade);

$("#sign-in").click(function(){
	event.preventDefault();

	debug("#sign-in on-click");
	playerName = $("#name").val().trim();
	debug(playerName);
	$("#sign-in-alert").toggleClass("alert-warning alert-success");
	$(".sign-in").remove();
	$("#sign-in-row").append("<p>Hi <span class='label label-success'>" + playerName + "</span> ! You are player " + playerId + ".</p>");
	

})

function choiceMade(){
	debug("choiceMade()");
	//alert("clicked");
	
}

/* document.ready will initalize the game once the DOM is loaded */
$(document).ready(function() {
	
	debug("document.ready()")

//	initalizeGame();

});

function initalizeGame() {

	debug("initalizeGame()");

	//hide game choices until user logs in
	$("#player-1-choices").toggle();
	$("#player-2-choices").toggle();
}

