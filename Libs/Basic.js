function gcd(n1, n2) {
	function _gcd(n1, n2) {
		return (n2==0?n1:_gcd(n2, Math.floor(n1%n2)));
	}
	if(n1<n2) { // Swap if wrong order
		var t=n1;
		n1=n2;
		n2=t;
	}
	return _gcd(n1, n2);
}

function roll(num) {
	return Math.round(Math.random()*num);
}

function log2(num) {
	var r=0;
	while(num=num>>1) r++;
	return r;
}