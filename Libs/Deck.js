/* 	Cards Value
	Returns the number a card represents

	For n cards in a deck, cards are represented from 0 to (n-1)
	In a deck of 52 cards, the cards are represented from 0-51

	In this sample deck, here is some of the values & suits for each n:
	n  Val  Suit
	0 = A - Diamond
	1 = A - Clover
	2 = A - Heart
	3 = A - Spade
	4 = 2 - Diamond
	5 = 2 - Clover
	6 = 2 - Heart
	7 = 2 - Spade
*/
function cardV(num) {
	return Math.floor(num/4);
}

/* 	Cards Suit
	Returns the number representing a suit from 0 to 3
*/
function cardS(num) {
	return num%4;
}

/* 	Cards File
	Returns the file name of a card
*/
function cardFile(num) {
	var suitName;
	switch(cardS(num)) {
		case 0: suitName='brown';
			break;
		case 1: suitName='green';
			break;
		case 2: suitName='blue';
			break;
		case 3: suitName='purple';
			break;
	}
	return 'card'+(cardV(num)+1)+suitName+'.png';
}

var Deck=function(deckSize) {
	if(deckSize==undefined) deckSize=52;



	// --====[ Variables ]====--
	this.DECKSIZE=deckSize; // If this must be changed, init() must be called afterwards
	this.cardCount;
	this.old_cardCount;

	this.selected=new Array(); // An array of size [deck size / (byte size(int))]
	this.old_selected=new Array();

	this.cards=new Array();
	this.old_cards=new Array();



	// --====[ Methods ]====--
	/*		Initialization
		Resets the deck's cards & selections
	*/
	this.init=function() {
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++)
			this.selected[i]=this.old_selected[i]=0;
		for(var i=0, e=this.DECKSIZE; i<e; i++)
			this.cards[i]=this.old_cards[i]=i;
		this.cardCount=old_cardCount=this.DECKSIZE;
	}

	/*		Is Selected?
		Returns true/false for if a card is selected

		Ex of selection in use:
			1] User picks 3 cards
			2] Program calls isSelectedV(num) on each selected card
			3] User submits
			4] Program calls listSelected(array) & adds all selected cards to the array
			5] Program calls deleteSelected()
			6] Program uses the values in the array
	*/
	this.isSelectedV=function(num) { return 0!=(this.selected[Math.floor(num/32)]&(1<<(num%32))); }
	this.isSelectedD=function(num) { return this.isSelected(this.cards[num]); }

	/*		Selection
		[De]Select
	*/
	this.selectV=function(num) { this.selected[Math.floor(num/32)]|=(1<<(num%32)); }
	this.deselectV=function(num) { this.selected[Math.floor(num/32)]&=~(1<<(num%32)); }
	this.selectD=function(num) { this.selectV(this.cards[num]); }
	this.deselectD=function(num) { this.deselectV(this.cards[num]); }

	/*		Selection
		[De]Select All
	*/
	this.selectAll=function() { for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++) this.selected[i]=0xffffffff; }
	this.deselectAll=function() { for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++) this.selected[i]=0; }

	/*		Selection
		[De]Select Inverse
	*/
	this.selectInverse=function() { for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++) this.selected[i]=~this.selected[i]; }

	/*		State Save
		Save the current deck state so the player can experiment with the deck
	*/
	this.stateSave=function() {
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++)
			this.old_selected[i]=this.selected[i];
		for(var i=0, e=this.DECKSIZE; i<e; i++)
			this.old_cards[i]=this.cards[i];
		this.old_cardCount=this.cardCount;
	}

	/*		State Load
		Load the last state save
	*/
	this.stateLoad=function() {
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++)
			this.selected[i]=this.old_selected[i];
		for(var i=0, e=this.DECKSIZE; i<e; i++)
			this.cards[i]=this.old_cards[i];
		this.cardCount=this.old_cardCount;
	}

	/*		Shuffle
	*/
	this.shuffle=function() {
		var r, new_cards=new Array();
		for(var i=this.DECKSIZE-1; 0<=i; i--) {
			r=roll(i);
			new_cards[i]=this.cards[r];
			this.cards[r]=this.cards[i];
		}
		for(var i=this.DECKSIZE-1; 0<=i; i--) {
			r=roll(i);
			this.cards[i]=new_cards[r];
			new_cards[r]=new_cards[i];
		}
	}

	/*		List Selected
		Returns the amount of things selected & the array passed will have the card numbers inserted
	*/
	this.listSelected=function(list) {
		var listSize=0;
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++) {
			var s, selection=this.selected[i];
			while(selection!=0) {
				s=selection&-selection
				selection&=~s;
				list[listSize++]=(log2(s)+i*32);
			}
		}
		return listSize;
	}

	/*		
	*/
	this.add=function(list) {
		throw ('Not done yet');
	}
	this.del=function(list) {
		throw ('Not done yet');
	}

	/*		Get Card Count
		Returns the amount of cards left in the deck
	*/
	this.getCount=function() { return this.count; };



	// --====[ Constructor ]====--
	this.init();



	// --====[ Stop Herpaderping Cases ]====--
	this.isSelected=function(num) { throw ('this.isSelected() missing context.  Contexts are: [V]alue, [A]rray'); }

	this.isSelectedv=function(num) { throw (throw_case('Deck.isSelectedV')); }
	this.isSelectedd=function(num) { throw (throw_case('Deck.isSelectedD')); }
	this.isselectedV=function(num) { throw (throw_case('Deck.isSelectedV')); }
	this.isselectedD=function(num) { throw (throw_case('Deck.isSelectedD')); }
	this.isselectedv=function(num) { throw (throw_case('Deck.isSelectedV')); }
	this.isselectedd=function(num) { throw (throw_case('Deck.isSelectedD')); }



	this.select=function(num) { throw ('this.select() missing context.  Contexts are: [V]alue, [A]rray'); }
	this.deselect=function(num) { throw ('this.deselect() missing context.  Contexts are: [V]alue, [A]rray'); }

	this.SelectV=function(num) { throw (throw_case('Deck.selectV')); }
	this.DeselectV=function(num) { throw (throw_case('Deck.deselectV')); }
	this.SelectD=function(num) { throw (throw_case('Deck.selectD')); }
	this.DeselectD=function(num) { throw (throw_case('Deck.seselectD')); }

	this.Selectv=function(num) { throw (throw_case('Deck.selectV')); }
	this.Deselectv=function(num) { throw (throw_case('Deck.deselectV')); }
	this.Selectd=function(num) { throw (throw_case('Deck.selectD')); }
	this.Deselectd=function(num) { throw (throw_case('Deck.seselectD')); }

	this.selectv=function(num) { throw (throw_case('Deck.selectV')); }
	this.deselectv=function(num) { throw (throw_case('Deck.deselectV')); }
	this.selectd=function(num) { throw (throw_case('Deck.selectD')); }
	this.deselectd=function(num) { throw (throw_case('Deck.seselectD')); }



	this.selectall=function(num) { throw (throw_case('Deck.selectAll')); }
	this.deselectall=function(num) { throw (throw_case('Deck.deselectAll')); }

	this.SelectAll=function(num) { throw (throw_case('Deck.selectAll')); }
	this.DeselectAll=function(num) { throw (throw_case('Deck.deselectAll')); }



	this.Add=function(num) { throw (throw_case('Deck.addV')); }
	this.Del=function(num) { throw (throw_case('Deck.delV')); }
}

function throw_case(correct) { return 'Wrong casing.  Correct version of this call: '+correct+'(...)'; }