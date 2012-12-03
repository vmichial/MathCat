function Images() {
	//		****************IMAGES THAT SHOULD BE AVAILABLE AT ALL TIMES*****************

	//background images

	this.titleScreen = new Image();

	this.titleScreen.src = "Images/Backgrounds/beginingBackground.png";


	this.gameSetting = new Image();

	this.gameSetting.src = "Images/Backgrounds/gameSetting.png";


	this.gameOver = new Image();

	this.gameOver.src = "Images/Backgrounds/GameOver.png";
	
	this.Table = new Image();
	
	this.Table.src = "Images/Misc/table.png";
	
	this.Frame = new Image();
	
	this.Frame.src = "Images/Misc/frame.png";

	//deck image

	this.cardBack = new Image();

	this.cardBack.src = "Images/Cards/cardBack.png";

	//math cat faces

	this.worryPic = new Image();

	this.worryPic.src = "Images/CatFaces/mathCatWorry.png";


	this.OMGPic = new Image();

	this.OMGPic.src = "Images/CatFaces/mathCatAlmostDead.png";


	this.celebratePic = new Image();

	this.celebratePic.src = "Images/CatFaces/mathCatCelebrate.png";


	this.confusedPic = new Image();

	this.confusedPic.src = "Images/CatFaces/mathCatConfused.png";


	this.deadPic = new Image();

	this.deadPic.src = "Images/CatFaces/mathCatDead.png";


	this.excitedPic = new Image();

	this.excitedPic.src = "Images/CatFaces/mathCatExcited.png";

	//clock pics

	this.clockHappyPic = new Image();

	this.clockHappyPic.src = "Images/Clock/clockHappy.png";


	this.clockSadPic = new Image();

	this.clockSadPic.src = "Images/Clock/clockSad.png";

	//bonus related

	this.starPic = new Image();

	this.starPic.src = "Images/Stamps/check.png";


	this.failStampPic = new Image();

	this.failStampPic.src = "Images/Stamps/failStamp.png";

	//buttons

	this.plusBTN = new Image();

	this.plusBTN.src = "Images/Buttons/plusButton.png";


	this.plusBTNp = new Image();

	this.plusBTNp.src = "Images/Buttons/plusButtonPressed.png";


	this.minusBTN = new Image();

	this.minusBTN.src = "Images/Buttons/minusButton.png";


	this.minusBTNp = new Image();

	this.minusBTNp.src = "Images/Buttons/minusButtonPressed.png";


	this.multiBTN = new Image();

	this.multiBTN.src = "Images/Buttons/multiplyButton.png";


	this.multiBTNp = new Image();

	this.multiBTNp.src = "Images/Buttons/multiplyButtonPressed.png";


	this.divideBTN = new Image();

	this.divideBTN.src = "Images/Buttons/divideButton.png";


	this.divideBTNp = new Image();

	this.divideBTNp.src = "Images/Buttons/divideButtonPressed.png";

	//timer number pics

	this.clockTens = new Image();

	this.clockTens.src = "Images/Clock/clock9.png";


	this.clockOnes = new Image();

	this.clockOnes.src = "Images/Clock/clock9.png";

	//more buttons

	this.panicPic = new Image();

	this.panicPic.src = "Images/Buttons/panicButton.png";


	this.makeTermPic = new Image();

	this.makeTermPic.src = "Images/Buttons/makeTermButton.png";


	this.acceptPic = new Image();

	this.acceptPic.src = "Images/Buttons/acceptButton.png";


	this.cancelPic = new Image();

	this.cancelPic.src = "Images/Buttons/cancelButton.png";

	//splash arts for participants

	this.Thang = new Image();

	this.Thang.src = "Images/Backgrounds/edwardThang.png";

	this.JYC = new Image();

	this.JYC.src = "Images/Backgrounds/JoyClayton.png";

	this.France = new Image();

	this.France.src = "Images/Backgrounds/FranciaGarcia.png";

	this.VMichial = new Image();

	this.VMichial.src = "Images/Backgrounds/VMichial.png";

	this.CodeForGood = new Image();

	this.CodeForGood.src = "Images/Backgrounds/codeforGood.png";

	//bonus counter pics

	this.addTimes = new Image();

	this.addTimes.src = "Images/Times/times1.png";


	this.minusTimes = new Image();

	this.minusTimes.src = "Images/Times/times1.png";


	this.multiTimes = new Image();

	this.multiTimes.src = "Images/Times/times1.png";


	this.divideTimes = new Image();

	this.divideTimes.src = "Images/Times/times1.png";


	this.noBonus = new Image();

	this.noBonus.src = "Images/Times/X.png";

	//ending screen T for playing

	this.endScreen = new Image();

	this.endScreen.src = "Images/Backgrounds/endScreen.png";

	//score number pics

	this.scorePics = new Array();

	for (i = 0; i < 7; i++) {
		this.scorePics[i] = new Image();
		this.scorePics[i].src = "Images/Score/score0.png";
	}
}