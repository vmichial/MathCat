function generateEQ(level) {
/*
	level 1 should be in the form: x=n1
	level 2 should be in the form: x + n1 = n2  || n1 + x = n2
	level 3 should be in the form: x - n1 = n2  || n1 - x = n2
	level 4 should be in the form: x * n1 = n2  || n1 * x = n2
	level 5 should be in the form: x / n1 = n2  || n1 / x = n2
	level 6 should be in the form: x +- n1 +- n2 = n3 || n1 +- x +- n2 = n3
	level 7 should be in the form: n1x +- n2 = n3 || n1 +- n2x = n3
	level 8 should be in the form: n1/x +- n2 = n3 || x/n1 +- n2 = n3
	level 9 should be in the form: n1x/n2 = n3 || n1/n2x = n3
	level 10 should be in the form: n1x/*n2 +- n3 = n4 || n1/*n2x +- n3 = n4

	use random for n1,n2,n3,n4
	
	/* means divide or multiply , and +- means plus or muinus
*/


	return { EQ: "X =0", answer: 0 };
}