/*
	The transitions class is meant to hijack the game in order to show a transition.
	To initiate a transition, call the start transition method. the method should take
	in a string perameter which is the name of your transition.
	
	the transition should do whatever you like or need it to do. and you need
	associated draw,clickHandle, init, and proceed functions for every transition. In 
	mathCatTwoPointOh.html transitions are looked for FIRST! in both the 
	gameStatusCheck() and draw() meaning that regardless of the state the game 
	is in, it essintially halts ALL	game progression and performs the transition

	the init function within each of the transition sub-objects are used in setting up the state
	of the object. transitions care only about limited information but need to know 
	EVERYTHING potentially so we pass the gamestate to be absolutely sure!
	
	IT IS A GOOD IDEA TO STOP ALL CURRENT SOUNDS BEFORE INITIATING A TRANSITION, AND IT IS GOOD TO KILL
	ALL SOUNDS WHEN ENDING A TRANSITION
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
	
	//update works like it should in the main page
	//look for what should change based on the click
	//positions, only call it if a click needs handling
	this.update = function(posX,posY){
		if(this.startLevelActive){
			this.levelStart.clickHandler(posX,posY);
		}
		else if(this.levelSummaryActive){
			this.summary.clickHandler(posX,posY);
		}
		else if(this.gameEndActive){
			this.endGame.clickHandler(posX,posY);
		}	
	}
	//proceed means do the suff you have to do in your
	//transition, if that is making cutscenes or fetching
	//and altering data, just make the correct sub object work it
	this.proceed = function(){
		if(this.startLevelActive){
			this.startLevelActive = this.levelStart.proceed();
		}
		else if(this.levelSummaryactive){
			this.levelSummaryActive = this.summary.proceed();
		}
		else if(this.gameEndActive){
			this.gameEndActive = this.endGame.proceed();
		}
		else{
			this.inTransition = false;
		}
	}
	
	this.draw = function(context){
		if(startLevelActive){this.levelStart.draw(context);}
		else if(levelSummaryActive){this.levelSummary.draw(context);}
		else if(gameEndActive){this.endGame.draw(context);}
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
				this.levelStart.init(gameStatus);
				break;
			case "levelSummary":
				this.levelSummaryActive = true;
				this.summary.init(gameStatus);
				break;
			case "gameEnd":
				this.gameEndActive = true;
				this.endGame.init(gameStatus);
				break;
		}	
	}
	
	
	
	//start level hijacks the game by telling
	//the player what level they are on
	//and giving a ready start
	function startLevel(){
		this.currentState;
	
		this.clickHandler = function(posX,posY){
			
		}		
		this.proceed = function(){
			//proceed must return true if the transition is not over
			//and false to signal it is done
		}
		this.draw = function(ctx){
		
		}
		this.init = function (gameStatus) {
			this.currentState = gameStatus;
		}
		
	}
	this.levelStart = new startLevel();
	
	//Level summary tells the player how they did
	//on the previous questions in the last homework
	//level
	function levelSummary() {
		this.currentState;
		
		this.clickHandler = function (posX,posY) {

		}
		this.proceed = function () {
			//proceed must return true if the transition is not over
			//and false to signal it is done
		}
		this.draw = function (ctx) {

		}
		this.init = function(gameStatus) {
			this.currentState = gameStatus;
		}
	}
	this.summary = new levelSummary();

	//endgame function gives the player a rundown of everything
	//they did, from score, level reached, and grades for tests.
	//this will be followed by the game over state, after some encouraging
	function gameEnd(){
		this.currentState;
		
		this.clickHandler = function (posX,posY) {

		}
		this.proceed = function () {
			//proceed must return true if the transition is not over
			//and false to signal it is done
		}
		this.draw = function (ctx) {

		}
		this.init = function (gameStatus) {
			this.currentState = gameStatus;
		}
	}
	this.endGame = new gameEnd();


}