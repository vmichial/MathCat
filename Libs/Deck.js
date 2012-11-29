function cardV(num) {
	if (num < 0 || 52 <= num) throw ('Index out of bound of deck [0-51].  Attempted to call: ' + 'cardV(' + num + ')');
	return Math.floor(num / 4);
}
function cardS(num) {
	return num % 4;
}
function cardFile(num) {
	var suitName;
	switch (cardS(num)) {
		case 0: suitName = 'brown';
			break;
		case 1: suitName = 'green';
			break;
		case 2: suitName = 'blue';
			break;
		case 3: suitName = 'purple';
			break;
	}
	return 'card' + (cardV(num) + 1) + suitName + '.png';
}

var Deck = function (deckSize) {
	if (deckSize == undefined) deckSize = 52;


	// --====[ Variables ]====--
	this.DECKSIZE = deckSize;

	this.selected = new Array(); // An array of size [deck size / (byte size(int))]
	this.old_selected = new Array();

	this.cards = new Array();
	this.old_cards = new Array();


	// --====[ Methods ]====--
	this.init = function () {
		for (var i = 0, e = Math.floor(this.DECKSIZE / 32) + 1 ; i < e; i++)
			this.selected[i] = this.old_selected[i] = 0;
		for (var i = 0, e = this.DECKSIZE; i < e; i++)
			this.cards[i] = this.old_cards[i] = i;
	}

	this.isSelected = function (num) {
		return 0 != (this.selected[Math.floor(num / 32)] & (1 << (num % 32)));
	}

	this.select = function (num) {
		this.selected[Math.floor(num / 32)] |= (1 << (num % 32));
	}
	this.deselect = function (num) {
		this.selected[Math.floor(num / 32)] &= ~(1 << (num % 32));
	}
	this.selectAll = function () {
		for (var i = 0, e = Math.floor(this.DECKSIZE / 32) + 1 ; i < e; i++)
			this.selected[i] = 0xffffffff;
	}
	this.deselectAll = function () {
		for (var i = 0, e = Math.floor(this.DECKSIZE / 32) + 1 ; i < e; i++)
			this.selected[i] = 0;
	}

	this.stateSave = function () {
		for (var i = 0, e = Math.floor(this.DECKSIZE / 32) + 1 ; i < e; i++)
			this.old_selected[i] = this.selected[i];
	}
	this.stateLoad = function () {
		for (var i = 0, e = Math.floor(this.DECKSIZE / 32) + 1 ; i < e; i++)
			this.selected[i] = this.old_selected[i];
	}

	this.setCards=function(list, listSize){
		this.DECKSIZE = listSize;
		this.init();
		for (var i = 0; i < listSize; i++) this.cards[i] = list[i];
	}

	this.shuffle = function () {
		var r, new_cards = new Array();
		for (var i = this.DECKSIZE - 1; 0 <= i; i--) {
			r = roll(i);
			new_cards[i] = this.cards[r];
			this.cards[r] = this.cards[i];
		}
		for (var i = this.DECKSIZE - 1; 0 <= i; i--) {
			r = roll(i);
			this.cards[i] = new_cards[r];
			new_cards[r] = new_cards[i];
		}
	}

	this.listSelected = function (list) {
		var listSize = 0;
		for (var i = 0, e = Math.floor(this.DECKSIZE / 32) + 1 ; i < e; i++) {
			var s, selection = this.selected[i];
			while (0 != selection) {
				s = selection & -selection
				selection &= ~s;
				list[listSize++] = (log2(s) + i * 32);
			}
		}
		return listSize;
	}


	// --====[ Constructor ]====--
	this.init();
}