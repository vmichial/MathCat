//whenever we start a game, we need to keep track of all information
//relavant to the player. so we have a Player class. just give it a 
//string when its made, and that will be the player name.
function Player() {
	//if we ever go multiplayer, each player needs their own deck.
	//same goes for adding AI. so encapsulate the deck into the 
	//player's relavant information, here is myDeck
	this.myDeck = new Deck();
	this.myHand = [5];			//hold the current src names of cards in hand
	this.name = "Math\n Cat";	//player name
	this.totalscore = 0;		//start the score at zero, this is the score for ENTIRE game
	this.currentScore = 0;		//this is the score for the current HW questions
	this.level = 1; 			//this is for the current level
	this.problemNumber = 1;		//start at first problem
	this.currentBonus = 0;		//this counts the bonuses for the current HW problem
	this.AddBonus = 0;			//keeps track of how many additions have been done in HW
	this.subtractBonus = 0;		//keeps track of how many subtractions have been done in HW
	this.multiplyBonus = 0;		//keeps track of how many multiplications have been done in HW
	this.divideBonus = 0;		//keeps track of how many divisions have been done in HW
	this.currentEQ = "X = 0"; 	//keeps track of current Equation for problem
	this.currentX = 0;			//hold the value of X for current problem in HW
	this.panicked = false;			//bool for telling us if panic button was pressed this equation

	this.additionBonus = false;
	this.subtractionBonus = false;
	this.multiplyBonus = false;
	this.divideBonus = false;

	this.numAdditions = 0;
	this.numSubtractions = 0;
	this.numMultiplies = 0;
	this.numDivisions = 0;

	this.deckEmpty = false;
	//variables for displaying info on answering questions
	this.answerSoFar = 0;//the answer you can attempt to submit
	this.answerBeingBuilt = 0;//the term you are currently building
	this.answerAttempted = false;//if you have attempted an answer, display answer so far

	this.initializePlayer = function () {
		//ADD CODE HERE FOR SETTING THE PLAYER UP AT GAME START
		//call functions for the deck.
		this.myDeck.initializeDeck();
		this.myDeck.shuffleDeck();
		this.myDeck.makeFirstHand();
		this.updateHand();
		var nexteq = generateEQ(this.level);
		this.currentEQ = nexteq.EQ;
		this.currentX = nexteq.answer;
		this.totalScore = 0;		
	    this.currentScore = 0;		
	    this.level = 1; 			
	    this.problemNumber = 1;		
	    this.currentBonus = 0;		
	    this.AddBonus = 0;			
	    this.subtractBonus = 0;		
	    this.multiplyBonus = 0;		
	    this.divideBonus = 0;		
	    this.panicked = false;		
        
	    this.additionBonus = false;
	    this.subtractionBonus = false;
	    this.multiplyBonus = false;
	    this.divideBonus = false;
        
	    this.numAdditions = 0;
	    this.numSubtractions = 0;
	    this.numMultiplies = 0;
	    this.numDivisions = 0;
        
	    this.deckEmpty = false;
	    //variables for displaying info on answering questions
	    this.answerSoFar = 0;//the answer you can attempt to submit
	    this.answerBeingBuilt = 0;//the term you are currently building
		//is all i guess is left easy function... honestly...
		//it takes more time to make this comment than to actually
		//code it.. but i will leave it to YOU BWAHAHAHAHAHAHA!
	}
	this.skipProblem = function()
	{
		var nextEQ;
		
		if((this.problemNumber+1)>10){
			nextEQ = generateEQ(this.level+1);
			this.level++;
			this.problemNumber = 1;
			this.currentEQ = nextEQ.EQ;
			this.currentX = nextEQ.answer;
		}
		else{
			nextEQ = generateEQ(this.level);
			this.problemNumber++;
			this.currentEQ = nextEQ.EQ;
			this.currentX = nextEQ.answer;
		}
		this.numAdditions = 0;
		this.numSubtractions = 0;
		this.numMultiplies = 0;
		this.numDivisions = 0;
		this.panicked = false;
		this.answerSoFar = 0;
		this.answerBeingBuilt = 0;
	}	
	this.addCardToScore = function (cardChoice) {
		//add code here to add to current score. 
		//this goes up depending on what cards are used
		//and how many were used
		this.totalScore -= this.currentScore;
		this.currentScore += this.myHand[cardChoice].myValue;
		this.totalScore += this.currentScore;		
	}
	this.nextProblem = function (newEQ, newX) {
		//insert code here to advance to the next problem generate new EQ and X
		//and bump up the problem number
		this.problemNumber = this.problemNumber + 1;
		this.currentEQ = newEQ;
		this.currentX = newX;
	}
	this.nextLevel = function (newEQ, newX) {
		//add code here for progressing the player to the next level
		//set all values appropriately
		this.level = this.level + 1;
		this.currentEQ = newEQ;
		this.currentX = newX;
	}
	this.updateBonus = function () {
		//um...update the bonuses
		//if the player presses the '+''-''*''/' buttons
		//add one to the correct bonus, if they cancel, set to zero.
		//you figure out how to handle cancels or what not
		var totalAdd = 0.2 * this.currentScore * this.AddBonus;
		var totalSubtract = 0.3 * this.currentScore * this.subtractBonus;
		var totalMultiply = 0.4 * this.currentScore * this.multiplyBonus;
		var totalDivision = 0.5 * this.currentScore * this.divideBonus;
		this.currentScore = this.currentScore + totalDivision + totalMultiply + totalSubtract + totalAdd;
	}	
	this.checkAnswer = function() {
		if(this.answerSoFar == this.currentX){return true;}
		else return false;
	}
	this.wrongAnswer = function(){
		this.numAdditions = 0;
		this.numSubtractions = 0;
		this.numMultiplies = 0;
		this.numDivisions = 0;
		this.answerSoFar = 0;
		this.answerBeingBuilt = 0;
	}
	this.correctAnswer = function(){
		
	}
	this.updateTotalScore = function () {
		//this is called when a problem is finished, it should add the 
		//currentScore to the TotalScore. and reset anything to what it needs to be
		this.Totalscore += this.currentScore + this.currentBonus;
	}

	this.updateHand = function () {
		//whatever cards are inHand, we need these card pictures displayed.
		//hold those cards data in the array, use this function to populate 
		//and update the array
		if (this.myDeck.numUsed < this.myDeck.MAX_DECK_SIZE) {
			var handNum = 0;
			for (var i = 0; i < this.myDeck.numUsed; i++) {
				if (this.myDeck.inHand[i].here == true) {
					this.myHand[handNum] = this.myDeck.inHand[i];
					handNum++;
				}
			}
			var temporary;
			for (var a = 0; a < 5 ; a++) {
				for (var b = a + 1; b < 5 ; b++) {
					if (this.myHand[b].rank < this.myHand[a].rank) {
						temporary = this.myHand[b];
						this.myHand[b] = this.myHand[a];
						this.myHand[a] = temporary;
					}
				}
			}
		}
	}
	//if anymore needed, add them in onto next class
};