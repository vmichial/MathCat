maxLVL = 5;

function generateEQ(level) {
	var MAX = 64;

	function struct() { this.EQ = ""; this.answer = 0; };
	// Rolls a number
	function roll(num) {
		return Math.round(Math.random() * (num == undefined ? MAX : num));
	}
	// Gets the common divisor of 2 numbers
	function gcd(n1, n2) {
		if (n1 < n2) { // Swap if wrong endian
			var t = n1;
			n1 = n2;
			n2 = t;
		}

		if (n2 == 0) return n1;
		return comDiv(n2, Math.floor(n1 % n2));
	}

	ans = new struct();
	function assemble(b, x, a, c1, c2) {
		// Formats a positive & negative number differently.
		function pm(n) {
			return '' + (n < 0 ? '(' + n + ')' : n);
		}
		if (a == undefined) a = 1;
		if (c1 == undefined) c1 = 0;
		if (c2 == undefined) c2 = 0;

		var lhs = new Array();

		var o1, o2, o3;
		o1 = roll(2);
		o2 = roll(1); if (o1 <= o2) o2++;
		o3 = (o1 == 0 || o2 == 0 ? (o1 == 1 || o2 == 1 ? 2 : 1) : 0);

		var isFrac = (typeof a == 'string');
		if (isFrac) a = Number(a.substring(1, a.length));

		if (a != 1) {
			if (isFrac) {
				lhs[o1] = 'x÷' + pm(a);
			} else {
				lhs[o1] = pm(a) + '•x';
			}
		} else {
			lhs[o1] = 'x';
		}

		lhs[o2] = (c1 == 0) ? '' : '' + pm(c1);
		lhs[o3] = (c2 == 0) ? '' : '' + pm(c2);



		ans.answer = x;
		ans.EQ = lhs[0];
		if (lhs[1] != '') ans.EQ += (ans.EQ == '' ? '' : ' + ') + lhs[1];
		if (lhs[2] != '') ans.EQ += (ans.EQ == '' ? '' : ' + ') + lhs[2];
		ans.EQ += ' = ' + b;
	}


	//		For any expression in the form of:
	// ax+c=n
	var factor, temp = 0;
	var a, x, c, b;
	a = 1; x = c = b = 0;



	if (1 <= level) { // Level 1+
		x = roll();
		if (x < 2) x = roll(); // Reduce chances of getting 0 & 1
		b = x;
		assemble(b, x);
	}

	if (2 <= level) { // Level 2+
		temp = roll(x / 3 * 2); // Roll a C
		if (temp < 2) temp = roll(x / 3 * 2); // Reduce chances of getting 0 & 1

		switch (level) {
			case 2:
				c = temp;
				b += temp;
				break;
			case 3:
				temp *= (Math.pow(-1, roll(10)))
				c = temp;
				b += temp;
				break;
			case 4:
				while (temp < 1) temp++;
				a = temp;
				b *= temp;

				// reduce to make math easier

				break;
			case 5:
				while (temp < 2) temp++;
				a = '/' + temp;
				x *= temp;
				break;
		}

		assemble(b, x, a, c);
	}

	if (6 <= level) { // Level 6+
	}



	return ans;
}

/*		Reference:
	level 1 should be in the form:  x = b

	level 2 should be in the form:  x + c = b
	level 3 should be in the form:  x - c = b
	level 4 should be in the form:  x * c = b
	level 5 should be in the form:  x / c = b

	level 6 should be in the form:  x +- c1 +- c2 = b
	level 7 should be in the form:  ax +- c... = b
	level 8 should be in the form:  a/x +- c... = b
	level 9 should be in the form:  x/a = b
	level 10 should be in the form: x/*a +- c... = b
*/