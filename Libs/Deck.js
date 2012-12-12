function cardV(num) {
	//if (num < 0 || 52 <= num) throw ('Index out of bound of standard deck [0-51].  Attempted to call: ' + 'cardV(' + num + ')');
	return Math.floor(num/4);
}
function cardS(num) {
	return num%4;
}
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
	this.DECKSIZE=deckSize;
	this.cardCount;

	this.selected=new Array(); // An array of size [deck size / (byte size(int))]
	this.old_selected=new Array();

	this.cards=new Array();
	this.old_cards=new Array();



	// --====[ Methods ]====--
	this.init=function() {
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++)
			this.selected[i]=this.old_selected[i]=0;
		for(var i=0, e=this.DECKSIZE; i<e; i++)
			this.cards[i]=this.old_cards[i]=i;
		this.cardCount=this.DECKSIZE;
	}

	this.isSelectedV=function(num) {
		return 0!=(this.selected[Math.floor(num/32)]&(1<<(num%32)));
	}
	this.isSelectedD=function(num) {
		num=this.cards[num];
		return this.isSelected(num);
	}

	this.selectV=function(num) {
		this.selected[Math.floor(num/32)]|=(1<<(num%32));
	}
	this.deselectV=function(num) {
		this.selected[Math.floor(num/32)]&=~(1<<(num%32));
	}
	this.selectD=function(num) {
		num=this.cards[num];
		this.selectV(num);
	}
	this.deselectD=function(num) {
		num=this.cards[num];
		this.deselectV(num);
	}

	this.selectAll=function() {
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++)
			this.selected[i]=0xffffffff;
	}
	this.deselectAll=function() {
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++)
			this.selected[i]=0;
	}

	this.selectInverse=function() {
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++)
			this.selected[i]=~this.selected[i];
	}

	this.stateSave=function() {
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++)
			this.old_selected[i]=this.selected[i];
	}
	this.stateLoad=function() {
		for(var i=0, e=Math.floor(this.DECKSIZE/32)+1 ; i<e; i++)
			this.selected[i]=this.old_selected[i];
	}

	this.setCards=function(list, listSize) {
		this.DECKSIZE=listSize;
		this.init();
		for(var i=0; i<listSize; i++) this.cards[i]=list[i];
	}

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

	// add
	// del
	// size



	// --====[ Constructor ]====--
	this.init();



	// --====[ Common Case Errors ]====--
	this.isSelectedv=function(num) { throw (throw_case('Deck.isSelectedV')); }
	this.isSelectedd=function(num) { throw (throw_case('Deck.isSelectedD')); }
	this.isselectedV=function(num) { throw (throw_case('Deck.isSelectedV')); }
	this.isselectedD=function(num) { throw (throw_case('Deck.isSelectedD')); }
	this.isselectedv=function(num) { throw (throw_case('Deck.isSelectedV')); }
	this.isselectedd=function(num) { throw (throw_case('Deck.isSelectedD')); }

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
}

function throw_case(correct) { return 'Wrong casing.  Correct version of this call: '+correct+'(...)'; }