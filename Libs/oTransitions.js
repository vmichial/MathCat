/*
	The transitions class is meant to hijack the game in order to show a transition.
	To initiate a transition, call the start transition method. the method should take
	in a string perameter which is the name of your transition.
	
	the transition should do whatever you like or need it to do. and you need
	associated draw,clickHandle,and proceed functions for ever transition. In 
	mathCatTwoPointOh.html transitions are looked for FIRST! in both the 
	gameStatusCheck() and draw() meaning that regardless of the state the game 
	is in, it essintially halts ALL	game progression and performs the transition
*/

function Transitions(){
	//bool for telling if a transition is active
	this.inTransition = false;
	//bools for telling which transition is active
	this.startLevelActive = false;
	this.levelSummaryActive = false;
	this.gameEndActive = false;
	
	function transitionInProgress(){
		if(this.inTransition){return true;}
		else{return false;}
	}
	
	function startTransition(transName){
		this.intransition = true;
		var funcName = ( (transName == 'undefined') ? "badName" : transName);
	
	}
	
	//start level hijacks the game by telling
	//the player what level they are on
	//and giving a ready start
	function startLevel(playerData){
		this.clickHandler = function(click){
			
		}		
		this.proceed = function(){
			
		}
		this.draw = function(ctx){
		
		}
		
	}
	
	//Level summary tells the player how they did
	//on the previous questions in the last homework
	//level

}