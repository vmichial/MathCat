//		***********GAME STATE RELATED VARIABLES ********************
//these variables keep track of the state of the game for gameplay logic*****
function GameStates() {
	function Moods() {
		this.Fearful = false;		//bool for determining if we should use fearful portrait
		this.Excited = true;			//bool for determining if we should use Excited portrait
		this.Celebrate = false;		//bool for determining if we should use Celebrate portrait
		this.Confused = false;		//bool for determining if we should use Confused portrait
		this.Dead = false;			//bool for determining if we should use Dead portrait
		this.OMG = false;
	}
	this.mood = new Moods();


	function Hand() {
		this.selected1 = false;		//these hand selected bools are needed for drawing.
		this.selected2 = false;		//if we click on a card, we want to move it slightly
		this.selected3 = false;		//from the default position
		this.selected4 = false;
		this.selected5 = false;

		this.used1 = false;			//tells us if a card was used in making a value, so it can't be used again
		this.used2 = false;
		this.used3 = false;
		this.used4 = false;
		this.used5 = false;
	}
	this.hand = new Hand();


	function Logic() {
		//math logic for cards variable
		this.isIdle = true;
		this.pickAcard = true;
		this.pickAsign = false;
		this.merge = false;
		this.ASF = false;
		this.ABB = false;
		this.answerSoFar = 0;
		this.answerBeingBuilt = 0;
		this.answered = false;
		this.cardSelected = false;

		this.makeTermActive = false;		//bool for telling us if in makeTerm mode

		this.inDivision = false;			//bools for the buttons
		this.inAddition = false;			//
		this.inSubtraction = false;		//
		this.inMultiplication = false;	//mmk
	}
	this.logic = new Logic();


	function PlayerData() {
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
	}
	this.playerData = new PlayerData();


	function Location() {
		this.atStartupScreen = true;	//bool for telling us what screen we are in startup screen, which shows our logos
		this.atTitleScreen = false;		//bool for at title screen, true means, show title and play title music
		this.atGameScreen = false;		//bool for at game screen, do the game loop for this portion
		this.atGameOverScreen = false;	//oh so sad, true if you just phail hard
		this.atEndScreen = false;
	}
	this.location = new Location();


	function TimeState() {
		this.outOfTime = false;
		this.timeRemaining = 99;
		this.tensTime = 9;
		this.onesTime = 9;

		this.started = false;
		this.clockTimer = 0;
		this.followTime = false;
	}
	this.time = new TimeState();


	function Splash() {
		this.startupTimer = 0;
		this.showEdward = false;
		this.showVMichial = true;
		this.showFranciaGarcia = false;
		this.showJYC = false;
		this.showCodeForGood = false;
	}
	this.splash = new Splash();


	this.player1 = new Player();
	this.player1.initializePlayer();
}