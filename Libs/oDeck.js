//the card class, represents the relavant data for a CARD
function Card(value, color, used) {
	this.here = used;			//used as a flag for if it is in a particular spot, hand, deck, or used
	this.myValue = value;		//in integer value for doing math with
	this.myColor = color;		//a string for holding the color, used in making the name of the image
	this.myImage = new Image();	//make an image variable
	this.rank = 0;
	this.disabled = false;
};
//the deck class. represents the relavant data to manage a deck
//including which cards are in the deck, in the player's hand
//and which have been used.
function Deck() {
	//remember the deck works like this. the 0 spot in the array
	//for each one (inDeck, inHand, used) are all the same card
	//but the bool, "here" will only be true in ONE OF THEM
	//if you are true inDeck then you are false inHand and used.
	//this way we know where cards are. 
	this.inDeck = [52];			//thecard array for the deck
	this.inHand = [52];			//card array for the hand
	this.used = [52];			//card array for used cards
	this.numUsed = 0;			//use this variable to keep track of how many cards are used
	this.MAX_DECK_SIZE = 52;
	this.x_size = 90;
	this.y_size = 120;
	this.handSize = 5;

	this.initializeDeck = function () {
		var color = ["blue", "brown", "green", "purple"];
		var inB = 0;
		for (var i = 0; i < 13; i++) {

			for (var j = 0; j < 4; j++) {
				//edit needed to make cards with i+1 since we ned 13 and not 0
				this.inDeck[inB] = new Card(i + 1, color[j], true);
				this.inHand[inB] = new Card(i + 1, color[j], false);
				this.used[inB] = new Card(i + 1, color[j], false);
				this.inHand[inB].myImage.src = "Images/Cards/card" + (i + 1) + color[j] + ".png"
				inB += 1;
			}
		}
		//add code here for initializing the deck
		//each array should be filled with card objects
		//the color should be either "green""red""purple"or "black"
	}
	this.shuffleDeck = function () {
		//add code here for shuffleing the deck.
		//remember, however you move the cards in one
		//array, MOVE IT THE SAME IN THE OTHERS
		for (var c = 0; c < 700 ; c++) {
			for (var i = 0; i < this.MAX_DECK_SIZE ; i++) {
				rand = Math.floor((Math.random() * 51));
				var temp1 = this.inDeck[i];
				var temp2 = this.inHand[i];
				var temp3 = this.used[i];
				this.inDeck[i] = this.inDeck[rand];
				this.inHand[i] = this.inHand[rand];
				this.used[i] = this.used[rand];

				this.inDeck[rand] = temp1;
				this.inHand[rand] = temp2;
				this.used[rand] = temp3;
			}
		}

	}
	this.makeFirstHand = function () {
		//add code here for making the first five cards inHand
		for (var i = 0; i < 5; i++) {
			this.inDeck[i].here = false;
			this.inHand[i].here = true;
			this.inHand[i].rank = i + 1;
		}
		this.numUsed = 5;
		this.firstCard = 0;
		this.lastCard = 4;
	}
	
	this.addToHand = function(h1,h2,h3,h4,h5,H1,H2,H3,H4,H5){
		//goal is to add to hand, first know certain info
		var cardsLeft = this.MAX_DECK_SIZE - this.numUsed;//how many cards are left
		var handIndices = [this.handSize];//will hold the hand indices of the cards in hand
		var selections = [this.handSize];//will tell if the card in X position is selected
		
		//first get the indices of the cards in hand, make sure later that
		//there is always a card in hand so it doesn't derp
		for(var i = 0; i < this.handSize; i++){
			for(var j = 0; j<this.numUsed ; j++){
				if((this.inHand[j].here) && (this.inHand[j].rank == i+1)){
					handIndices[i] = j;
				}
			}
		}
		
		//now that we have found which cards are where in the correct ranking order
		//lets populate the selections array to say which cards are selected
		if(h1 || H1){selections[0] = true;}else{selections[0] = false;}
		if(h2 || H2){selections[1] = true;}else{selections[1] = false;}
		if(h3 || H3){selections[2] = true;}else{selections[2] = false;}
		if(h4 || H4){selections[3] = true;}else{selections[3] = false;}
		if(h5 || H5){selections[4] = true;}else{selections[4] = false;}
		
		//now assuming we don't derp this is what we do. 
		//if there are no cardsLeft, just disable the cards not selected
		//if there are between 1 and 5 cards remaining...um stuff
		//if there are more than 5 cards remaining, diable the current card at 
		//the current loop rank, make the card at numUsed have loop rank,
		//set current card to false inHand and true used, and make the card
		//at numUsed true inHand and false inDeck and increment numUsed up
		
		for(var c = 0; c < this.handSize; c++){
			if(!selections[c]){//a card not selected must be dumped
				
				if(cardsLeft <= 0 && (this.numUsed >= this.MAX_DECK_SIZE)){
					this.inHand[handIndices[c]].disabled = true;
					this.inDeck[handIndices[c]].disabled = true;
					this.used[handIndices[c]].disabled = true;
				}
				//else if(cardsLeft <= this.handSize){
				//	
				//}
				else if(cardsLeft > 0){
					this.inHand[this.numUsed].rank = this.inHand[handIndices[c]].rank;
					this.inHand[this.numUsed].here = true;
					this.inDeck[this.numUsed].here = false;
					
					this.inHand[handIndices[c]].here = false;
					this.used[handIndices[c]].here = true;
					
					cardsLeft--;
					this.numUsed++;
				}
			}
		}
	}


	this.resetDeck = function () {
		//add code here to reset the deck. just set all the bools to
		//show that all cards are inDeck. then we can do another hand

			this.initializeDeck();
			this.shuffleDeck();
			this.makeFirstHand();
		
	}
	this.isEmpty = function () {
		//check the used array, if its all true on here, return true.
		//this is needed in game logic to know when one of our
		//ending conditions are met. also if it is empty
		//we don't have to display the cardBack.png

		if (this.numUsed < this.MAX_DECK_SIZE) { return false; }
		else { return true; }
	}
};