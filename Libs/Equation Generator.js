maxLVL_generateEQ=10;

function generateEQ(level, MAX_NUM) {
	if(MAX_NUM==undefined) MAX_NUM=16;



	//========================
	//			Structs
	function Answer() { this.EQ=""; this.answer=0; };
	function Equation() {
		this.aDen;
		this.xDen;

		//	For any expression in the form of:
		//		ax + c = b
		this.a;
		this.x;
		this.c1;
		this.c2;
		this.b;



		this.init=function(num) {
			if(num==undefined) num=0;

			this.aDen=0;
			this.xDen=0;

			this.a=1;
			this.c1=0;
			this.c2=0;
			this.x=this.b=num;
		}

		this.translate=function(c1, c2) {
			if(c1!=undefined) this.b+=(this.c1=c1);
			if(c2!=undefined) this.b+=(this.c2=c2);
		}
		this.mul=function(num) {
			this.b=(this.b-this.c1-this.c2)*num+this.c1+this.c2;
			this.a=(this.b-this.c1-this.c2)/this.x;
		}
		this.seedDiv=function(num) {
			this.init(roll(MAX_NUM));

			if(roll(10)%2==0) { // Choose a/x or x/a
				//document.write(eq.a + '|' + eq.x + '|' + eq.c1 + '|' + eq.b + '<br>');
				eq.b=num;
				eq.a=eq.x+1; // Make non zero
				eq.x=eq.a*eq.b;
				eq.a='/'+eq.a;
			} else {
				eq.b=num+1; // Make non zero
				eq.x=eq.x+1;
				eq.a=eq.x*eq.b;
				eq.x='/'+eq.x;
			}
		}

		// 
		this.init(roll(MAX_NUM));
	};
	//			Structs
	//========================



	//========================
	function assemble(eq) {
		// Formats eq.a positive & negative number differently.
		function pm(n) {
			return ''+(n<0?'('+n+')':n);
		}

		if(eq.a==undefined) eq.a=1;
		if(eq.c1==undefined) eq.c1=0;
		if(eq.c2==undefined) eq.c2=0;

		var lhs=new Array();

		var o1, o2, o3;
		o1=roll(2);
		o2=roll(1); if(o1<=o2) o2++;
		o3=(o1==0||o2==0?(o1==1||o2==1?2:1):0);

		var xFrac=0, isFrac=(typeof eq.a=='string')||(typeof eq.x=='string');
		if(isFrac) {
			if(typeof eq.a=='string') {
				eq.a=Number(eq.a.substring(1, eq.a.length));
				xFrac=0;
			}
			if(typeof eq.x=='string') {
				eq.x=Number(eq.x.substring(1, eq.x.length));
				xFrac=1;
			}
		}

		if(eq.a!=1) {
			if(isFrac) {
				if(xFrac) lhs[o1]=pm(eq.a)+'÷x';
				else lhs[o1]='x÷'+pm(eq.a);
			} else {
				lhs[o1]=pm(eq.a)+'x';
			}
		} else {
			lhs[o1]='x';
		}

		lhs[o2]=(eq.c1==0)?'':''+pm(eq.c1);
		lhs[o3]=(eq.c2==0)?'':''+pm(eq.c2);



		ans.answer=eq.x;
		ans.EQ=lhs[0];
		if(lhs[1]!='') ans.EQ+=(ans.EQ==''?'':' + ')+lhs[1];
		if(lhs[2]!='') ans.EQ+=(ans.EQ==''?'':' + ')+lhs[2];
		ans.EQ+=' = '+eq.b;
	}
	//========================



	//========================
	//			Level Actions
	var ans=new Answer();
	var eq=new Equation(); // Level 1 is handled on creation

	if(2<=level) { // Level 2+
		var temp=roll(MAX_NUM/3*2); // Roll a C
		if(temp<2) temp=roll(MAX_NUM/3*2); // Reduce chances of getting 0 & 1

		switch(level) {
			case 2: // x + c = b
				eq.translate(roll(MAX_NUM));
				break;

			case 3: // x - c = b
				eq.translate(-roll(MAX_NUM));
				break;

			case 4: // ax = b
				while(eq.b==0) eq.init(roll(MAX_NUM));
				while(temp==0) temp=roll(MAX_NUM);
				eq.mul(temp);
				break;

			case 5: // x/a = b   =>   x = ab
				while(temp==0) temp=roll(MAX_NUM);
				eq.seedDiv(temp);
				break;
		}
	}

	if(6<=level) { // Level 6+
		var temp1=roll(MAX_NUM/3*2)*(Math.pow(-1, roll(10))); // Roll 2 C's
		var temp2=roll(MAX_NUM/3*2)*(Math.pow(-1, roll(10)));

		switch(level) {
			case 6: // x +- c1 +- c2 = b
				break;

			case 7: // ax +- c1... = b
				while(eq.b==0) eq.init(roll(MAX_NUM));
				while(temp==0) temp=roll(MAX_NUM);
				eq.mul(roll(MAX_NUM/3*2));
				break;

			case 8: // a/x +- c1... = b
			case 9: // x/a = b
				eq.seedDiv(roll(MAX_NUM/3*2));
				break;

			case 10: // x/*a +- c1... = b
				if(roll(10)%2==0) eq.seedDiv(roll(MAX_NUM/3*2));
				else {
					while(eq.b==0) eq.init(roll(MAX_NUM));
					eq.mul(roll(MAX_NUM/3*2));
				}
				break;
		}

		eq.translate(temp1, temp2);
	}

	assemble(eq);
	//			Level Actions
	//========================

	return ans;
}