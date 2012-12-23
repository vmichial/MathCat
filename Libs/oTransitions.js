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

	
	
	
	//start level hijacks the game by telling
	//the player what level they are on
	//and giving a ready start
	function startLevel(){
		this.currentState;
		this.frame = new Image();
		this.BG = new Image();
		this.text = 'LEVEL';
		
		this.frame.src = "Images/Misc/frame.png";
		this.BG.src = "Images/Misc/table.png";
		
		this.Timer = 0;
		this.fps = 30;
	
		this.clickHandler = function(posX,posY){
			this.Timer = 149;
		}		
		this.proceed = function(){
			this.Timer++;
			if((this.Timer/this.fps)>=5){
				return false;
			}
			else{return true;}
			//proceed must return true if the transition is not over
			//and false to signal it is done
		}
		this.draw = function(ctx){
			ctx.clearRect(0, 0, 1000, 700)
			ctx.drawImage(this.BG,0,0);
			ctx.drawImage(this.frame,340,110);
			ctx.font = '20px Arial';
			ctx.fillText(this.text,455,170);
			ctx.font = '60px Arial';
			if(this.currentState.player1.level > 99){
				ctx.fillText(this.currentState.player1.level,439,260);
			}
			else if(this.currentState.player1.level > 9){
				ctx.fillText(this.currentState.player1.level,453,260);
			}			
			else{
				ctx.fillText(this.currentState.player1.level,473,260);
			}
		}
		this.init = function (gameStatus) {
			this.currentState = gameStatus;
			this.Timer = 0;
		}
		
	}
	this.levelStart = new startLevel();
	
	//Level summary tells the player how they did
	//on the previous questions in the last homework
	//level
	function levelSummary() {
		//data
		this.currentState;
		this.itemTimer = 0;
		this.fps = 30;
		this.itemCount = 0;
		this.panic = new Image();
		this.notPanic = new Image();
		
		this.panic.src = "Images/Buttons/panicButtonPressed.png";
		this.notPanic.src = "Images/Buttons/panicButton.png";
		//this.scorePics = [7];
		
		this.showingItems = true;
		this.linger = false;
		this.end = false;
		//things that need drawing
		this.message1 = "LEVEL COMPLETE";
		this.message2 = "Good job!";
		this.message3 = "Click Anywhere to Continue...";
		this.message4 = "Current Score";		
		
		this.clickHandler = function (posX,posY) {
				if(this.showingItems){
					this.itemTimer = 7;
					}
				else if(this.linger){
					this.linger = false;
					this.end = true;
				}
		}
		this.proceed = function () {
			//proceed must return true if the transition is not over
			//and false to signal it is done
			//throw(this.currentState.player1.summaryData[0]);
			if(this.showingItems){
				this.itemTimer++;
				if((this.itemTimer/this.fps) >= 0.3){
					this.itemTimer = 0;
					this.itemCount++;
				}
				if(this.itemCount >= 15){this.showingItems = false; this.linger = true;}
				return true;
			}
			else if(this.linger){
				return true;
			}
			else if(this.end){
				return false;
			}
		}
		this.draw = function(ctx){		
			ctx.font = '60px Arial';
			ctx.fillText(this.message1,190,90);
			ctx.font = '30px Arial';
			
			var X = 45;
			var Y = 170;
			if(this.showingItems){
				for(var i = 0; i<= this.itemCount;i++){
					ctx.fillText(this.currentState.player1.SummaryData[this.currentState.player1.level-2].problems[i].EQ ,X,(Y+(36*i)));
				}
			}
			else if(this.linger){
				for(var i = 0; i < 15;i++){
					ctx.fillText(this.currentState.player1.SummaryData[this.currentState.player1.level-2].problems[i].EQ ,X,(Y+(36*i)));
				}
			}			
		}
		this.init = function(gameStatus){
			var status = gameStatus;
			this.currentState = status;
			this.itemTimer = 0;
			this.itemCount = 0;
			this.fps = 30;
			this.linger = false;
			this.end = false;
			this.showItems = true;
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
	this.proceed = function(currentState){
		if(this.startLevelActive){
			this.startLevelActive = this.levelStart.proceed();
		}
		else if(this.levelSummaryActive){
			this.levelSummaryActive = this.summary.proceed();
			if(!this.levelSummaryActive){this.startTransition('levelStart',currentState);}
		}
		else if(this.gameEndActive){
			this.gameEndActive = this.endGame.proceed();
		}
		else{
			this.inTransition = false;
		}
	}
	
	this.draw = function(context){
		if(this.startLevelActive){this.levelStart.draw(context);}
		else if(this.levelSummaryActive){this.summary.draw(context);}
		else if(this.gameEndActive){this.endGame.draw(context);}
	}
	
	this.startTransition = function(transName,gameStatus){
		var status = gameStatus;
		this.inTransition = true;
		var funcName = ((transName == 'undefined') ? "badName" : transName);
		switch (funcName) {
			case "badName":
				this.inTransition = false;
				break;
			case "levelStart":
				this.startLevelActive = true;
				this.levelStart = new startLevel();
				this.levelStart.init(status);
				break;
			case "levelSummary":
				this.levelSummaryActive = true;
				this.summary = new levelSummary();
				this.summary.init(status);
				break;
			case "gameEnd":
				this.gameEndActive = true;
				this.endGame = new gameEnd();
				this.endGame.init(status);
				break;
		}	
	}
	


}