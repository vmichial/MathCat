function Messages() { //DIALOG variables
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

	//Timers for certain messages
	this.acceptTimer = 0;
	this.cancelTimer = 0;
	this.cardTimer = 0;
	this.operatorTimer = 0;
	this.gameOverTimer = 0;
	this.mergeTimer = 0;
}