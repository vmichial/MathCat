function Messages() { //DIALOG variables
	this.skipDialog = false;
	this.skipMessage = "skip this question?";
	this.confirmDialog = false;
	this.confirmMessage = "accept to continue...";
	this.quitDialog = false;
	this.quitMessage = "Are you sure you want to quit?";
	this.acceptDialog = false;
	this.acceptMessage = "Accepted...";
	this.cancelDialog = false;
	this.cancelMessage = "Canceled...";
	this.failDialog = false;
	this.failMessage = "You failed this test :(";
	this.selectCardDialog = false;
	this.selectCardMessage = "select a card...";
	this.selectOperationDialog = false;
	this.selectOperationMessage = "Select a math operator...";
	this.restartDialog = false;
	this.restartMessage = "restart this question?";
	this.mergeDialog = false;
	this.mergeMessage = "Select an operator to merge";
	this.correctDiaog = false;
	this.correctMessage = "Answer Correct!";
	this.wrongDialog = false;
	this.wrongMessage = "Answer Incorrect!";
	this.panicDialog = false;
	this.panicMessage = "You already panicked!";
	this.yayPic = false;
	this.derpPic = false;

	//Timers for certain messages
	this.acceptTimer = 0;
	this.cancelTimer = 0;
	this.cardTimer = 0;
	this.operatorTimer = 0;
	this.gameOverTimer = 0;
	this.mergeTimer = 0;
	this.skipTimer = 0;
	this.wrongTimer = 0;
	this.correctTimer = 0;
	this.panicTimer = 0;
	this.yayTimer = 0;
	this.derpTimer = 0;
}