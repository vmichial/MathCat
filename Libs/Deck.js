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

	this.DECKSIZE = deckSize;
	this.selected = new Array();
	this.cards = new Array();



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
		for (var i = 0, e = Math.floor(this.DECKSIZE / 32)+1 ; i < e; i++)
			this.selected[i] = 0xffffffff;
	}
	this.deselectAll = function () {
		for (var i = 0, e = Math.floor(this.DECKSIZE / 32)+1 ; i < e; i++)
			this.selected[i] = 0;
	}


	//===================
	// Constructor:

	for (var i = 0; i < Math.floor(this.DECKSIZE / 32) ; i++) this.selected[i] = 0;
}