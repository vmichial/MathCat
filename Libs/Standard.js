
//			RandomClown's library of useful function



//		Basic Booleans
function isws(str) {
	var isWS = function (ch) {
		return ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r' || ch == '　';
	}

	for (var i = 0; i < str.length; i++) if (!isWS(str[i])) return false;
	return true;
}

function isalphaNL(ch) { return asc('a') <= asc(ch) && asc(ch) <= asc('z'); }
function isalphaNU(ch) { return asc('A') <= asc(ch) && asc(ch) <= asc('Z'); }
function isalphaWL(ch) { return asc('ａ') <= asc(ch) && asc(ch) <= asc('ｚ'); }
function isalphaWU(ch) { return asc('Ａ') <= asc(ch) && asc(ch) <= asc('Ｚ'); }
function isalpha(str) {
	var isalpha = function (ch) { return isalphaNL(ch) || isalphaNU(ch) || isalphaWL(ch) || isalphaWU(ch); }
	for (var i = 0; i < str.length ; i++) if (!isalpha(str[i])) return false;
	return true;
}

function isdigitN(ch) { return asc('0') <= asc(ch) && asc(ch) <= asc('9'); }
function isdigitW(ch) { return asc('０') <= asc(ch) && asc(ch) <= asc('９'); }
function isdigit(str) {
	var isdigit = function (ch) { return isdigitN(ch) || isdigitW(ch); }
	for (var i = 0; i < str.length; i++) if (!isdigit(str[i])) return false;
	return true;
}

function issignP(ch) { return ch == '+' || ch == '＋'; }
function issignN(ch) { return ch == '-' || ch == '－'; }
function issign(ch) { return ch == '-' || ch == '+' || ch == '－' || ch == '＋'; } // Not calling the code above so to arrange the order for performance.
function isperiod(ch) { return ch == '.' || ch == '．'; }

function isint(str) {
	var i = 0;

	if (!str.length) return false;
	if (issign(str[i])) {
		if (str.length == 1) return false;
		i++;
	}
	for (; i < str.length; i++) if (!isdigit(str[i])) return false;
	return true;
}
function isfloat(str) { // Add support for float
	var i = 0, d = 0;

	for (; i < str.length; i++) {
		if (!isdigit(str[i])) {
			if (str[i] == '.' && d++ == 0) continue;
			return false;
		}
	}
	if (d == 1 && i == 1) return false;
	return true;
}



//		Basic String Functions
function asc(ch) { return ch.charCodeAt(0); }
function chr(num) { return String.fromCharCode(num); }

function lcase(str) {
	var r = '', lcase = function (ch) { return isalphaNU(ch) || isalphaWU(ch) ? chr(asc(ch) + 32) : chr(asc(ch)); }
	for (var i = 0; i < str.length; i++) r += lcase(str[i]);
	return r;
}

function strieq(lhs, rhs) {
	if (!(lhs.length == rhs.length)) return false;
	for (var i = 0; i < lhs.length; i++) if (!(lcase(lhs[i]) == lcase(rhs[i]))) return false;
	return true;
}

function trimws(str) {
	var i, pos;
	for (i = 0; i < str.length; i++) if (!isWS(str[i])) break;
	pos = i;
	if (pos == str.length) return '';
	for (i = str.length - 1; pos < i; i--) if (!isWS(str[i])) break;
	return (pos == 0 && i == str.length - 1) ? str : str.substr(pos, i - pos + 1);
}

function mkstr(str, repeat) {
	if (repeat == undefined) repeat = 1;

	var r = '';
	for (var i = 0; i < repeat; i++) r += str;
	return r;
}



//		Hex Functions
function hex2int(str) {
	var hex2int = function (ch) {
		if (isdigitN(ch)) return asc(ch) - asc('0');
		else if (isdigitW(ch)) return asc(ch) - asc('０');
		else if (asc('a') <= asc(ch) && asc(ch) <= asc('f')) return asc(ch) - asc('a') + 10;
		else if (asc('A') <= asc(ch) && asc(ch) <= asc('F')) return asc(ch) - asc('A') + 10;
		else if (asc('ａ') <= asc(ch) && asc(ch) <= asc('ｆ')) return asc(ch) - asc('ａ') + 10;
		else if (asc('Ａ') <= asc(ch) && asc(ch) <= asc('Ｆ')) return asc(ch) - asc('Ａ') + 10;
		return -1;
	}
	var r = 0;
	for (var i = 0; i < str.length; i++) {
		var val = hex2int(str[i]);
		if (-1 < val) r = r * 16 + val;
		else return -1;
	}
	return r;
}

function int2hex(num) {
	var h = '', m;
	for (; num; num = Math.floor(num / 16)) {
		if ((m = num % 16) < 10) h = chr(asc('0') + m) + h;
		else h = chr(asc('a') + m - 10) + h;
	}
	return h;
}

function str2hex(str, bytes) {
	if (bytes == undefined) bytes = 1;

	var data = '';
	for (var i = 0; i < str.length; i++) {
		h = int2hex(asc(str[i]));
		if (bytes * 2 < h.length) return str2hex(str, bytes + 1);
		data += mkstr('0', bytes * 2 - h.length) + h;
	}
	return data;
}

function hex2str(str, bytes) {
	if (bytes == undefined) bytes = 1;

	var r = '', i = strieq(str.substr(0, 2), '0x') ? 2 : 0;
	if (i < str.length) {
		var offset = (str.length - i) % (bytes * 2);
		if (offset) {
			var val = hex2int(str.substr(i, offset));
			if (-1 < val) r += chr(val);
			else return 'Error: hex2str(\'' + str + '\') Bad hex token: \'' + str.substr(i, offset) + '\'';
			i += offset;
		}
	}
	for (; i < str.length; i += bytes * 2) {
		var val = hex2int(str.substr(i, bytes * 2));
		if (-1 < val) r += chr(val);
		else return 'Error: hex2str(\'' + str + '\') Bad hex token: \'' + str.substr(i, bytes * 2) + '\'';
	}
	return r;
}

function flipendian(data) {	// Assumes whole bytes, otherwise output is wrong
	var flipped = '', pre = '', i = 0;
	if (2 <= data.length && strieq(data.substr(0, 2), '0x')) {
		pre = '0x';
		i += 2;
	}
	for (; i < data.length; i += 2) flipped = data.substr(i, 2) + flipped;
	return pre + flipped;
}