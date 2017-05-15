var debugMode = true;

function debug(description, info) {

	if(debugMode) {
		if (info) console.log(description, info);
		else console.log(description);
	}
	
}

debug("game.js");

$(".shape-choice").click(function(){
	debug("on click", ".shape-choice");
	//alert("clicked");
})

