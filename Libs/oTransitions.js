/*
	The transitions class is meant to hijack the game in order to show a transition.
	To initiate a transition, call the start transition method. the method should take
	in a string perameter which is the name of your transition.
	
	the transition should do whatever you like or need it to do. and you need
	associated draw,clickHandle,and proceed functions for ever transition. In 
	mathCatTwoPointOh.html transitions are looked for FIRST! in both the 
	gameStatusCheck() and draw() meaning that regardless of the state the game 
	is in, it essintially halts ALL	game progression and performs the transition

	the init function within each of the transition sub-objects are used in setting up the state
	of the object. transitions care only about limited information but need to know 
	EVERYTHING potentially so we pass the gamestate to be absolutely sure!
*/

function Transitions(){
	//bool for telling if a transition is active
	this.inTransition = false;
	//bools for telling which transition is active
	this.startLevelActive = false;
	this.levelSummaryActive = false;
	this.gameEndActive = false;

	this.transitionInProgress = function(){
		if(this.inTransition){return true;}
		else{return false;}
	}
	
	this.update = function(click,pos){
	
	}
	
	this.draw = function(){
		if(startLevelActive){this.levelStart.draw();}
		else if(levelSummaryActive){this.levelSummary.draw();}
		else if(gameEndActive){this.endGame.draw();}
	}
	
	this.startTransition = function(transName,gameStatus){
		this.intransition = true;
		var funcName = ((transName == 'undefined') ? "badName" : transName);
		switch (funcName) {
			case "badName":
				this.inTransition = false;
				break;
			case "levelStart":
				this.startLevelActive = true;
				this.startLevel.init(gameStatus);
				break;
			case "levelSummary":
				this.levelSummaryActive = true;
				this.levelSummary.init(gameStatus);
				break;
			case "gameEnd":
				this.gameEndActive = true;
				this.gameEnd.init(gameStatus);
				break;
		}	
	}
	
	
	
	//start level hijacks the game by telling
	//the player what level they are on
	//and giving a ready start
	function startLevel(){
		this.clickHandler = function(click,position){
			
		}		
		this.proceed = function(){
			
		}
		this.draw = function(ctx){
		
		}
		this.init = function (gameStatus) {

		}
		
	}
	this.levelStart = new startLevel();
	
	//Level summary tells the player how they did
	//on the previous questions in the last homework
	//level
	function levelSummary() {
		this.clickHandler = function (click,position) {

		}
		this.proceed = function () {

		}
		this.draw = function (ctx) {

		}
		this.init = function(gameStatus) {

		}
	}
	this.summary = new levelSummary();

	//endgame function gives the player a rundown of everything
	//they did, from score, level reached, and grades for tests.
	//this will be followed by the game over state, after some encouraging
	function gameEnd(){
		this.clickHandler = function (click,position) {

		}
		this.proceed = function () {

		}
		this.draw = function (ctx) {

		}
		this.init = function (gameStatus) {

		}
	}
	this.endGame = new gameEnd();


}