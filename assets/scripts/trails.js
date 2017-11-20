
/******************************************

 * Cross browser cursor trailer script- By Brian Caputo (bcaputo@icdc.com)
 * Visit Dynamic Drive (http://www.dynamicdrive.com/) for full source code
 * Modified Dec 30th, 02' by DD. This notice must stay intact for use
 * Modified Nov 20th, 17' by John Duncan. Removed dependence on busy waiting,
 *     which bogged down javascript performance in other windows.
 ******************************************/

A=document.getElementById;
B=document.all;
C=document.layers;
T1=new Array("assets/styles/trails/trail1.gif",32,32,"assets/styles/trails/trail2.gif",24,24,"assets/styles/trails/trail3.gif",20,20,"assets/styles/trails/trail4.gif",16,16);

var offsetx=15 //x offset of trail from mouse pointer
var offsety=10 //y offset of trail from mouse pointer
var prevxpos;
var prevypos;
var interval;
var intervalSet = false;

nos=parseInt(T1.length/3);
rate=25;
ie5fix1=0;
ie5fix2=0;
rightedge=B? document.documentElement.clientWidth-T1[1] : window.innerWidth-T1[1]-20;
bottomedge=B? document.documentElement.scrollTop+document.documentElement.clientHeight-T1[2] : window.pageYOffset+window.innerHeight-T1[2];

for (i=0;i<nos;i++){
	createContainer("CUR"+i,i*10,i*10,i*3+1,i*3+2,"","<img src='"+T1[i*3]+"' width="+T1[(i*3+1)]+"px height="+T1[(i*3+2)]+"px border=0>");
}

function createContainer(N,Xp,Yp,W,H,At,HT,Op,St){
	with (document){
		write((!A && !B) ? "<layer id='"+N+"' left="+Xp+"px top="+Yp+"px width="+W+"px height="+H+"px" : "<div id='"+N+"'"+" style='position:absolute;left:"+Xp+"px; top:"+Yp+"px; width:"+W+"px; height:"+H+"px; ");

		if(St){
			if (C) {
				write(" style='");
			}
			write(St+";' ")
		}

		else write((A || B)?"'":"");
		write((At)? At+">" : ">");
		write((HT) ? HT : "");
		if (!Op) {
			closeContainer(N);
		}
	}
}

function closeContainer(){
	document.write((A || B)?"</div>":"</layer>")
}

function getXpos(N){
	if (A)
		return parseInt(document.getElementById(N).style.left);
	else if (B)
		return parseInt(B[N].style.left);
	else
		return C[N].left;
}

function getYpos(N){
	if (A)
		return parseInt(document.getElementById(N).style.top);
	else if (B)
		return parseInt(B[N].style.top);
	else
		return C[N].top;
}

function moveContainer(N,DX,DY){
	c=(A)? document.getElementById(N).style : (B)? B[N].style : (C)? C[N] : "";
	if (!B){
		rightedge=window.innerWidth-T1[1]-20;
		bottomedge=window.pageYOffset+window.innerHeight-T1[2];
	}
	c.left=Math.min(rightedge, DX+offsetx) + 'px';
	c.top=Math.min(bottomedge, DY+offsety) + 'px';
}

function cycle(){
	// do not busy wait
	if((getXpos("CUR"+(nos-1)) == prevxpos) && (getYpos("CUR"+(nos-1)) == prevypos)) {
		clearInterval(interval);
		intervalSet = false;
		return;
	}

	//if (IE5)
	if (document.all&&window.print){
		ie5fix1=document.documentElement.scrollLeft;
		ie5fix2=document.documentElement.scrollTop;
	}
	for (i=0;i<(nos-1);i++){
		moveContainer("CUR"+i,getXpos("CUR"+(i+1)),getYpos("CUR"+(i+1)));
	}
	prevxpos = getXpos("CUR"+(nos-1));
	prevypos = getYpos("CUR"+(nos-1));
}

function newPos(e){
	moveContainer("CUR"+(nos-1),(B)?event.clientX+ie5fix1:e.pageX+2,(B)?event.clientY+ie5fix2:e.pageY+2);
	if(!intervalSet) {
		interval = setInterval("cycle()",rate);
		intervalSet = true;
	}
}

function getedgesIE(){
	rightedge=document.documentElement.clientWidth-T1[1];
	bottomedge=document.documentElement.scrollHeight-T1[2];
}

if(B){
	window.onload=getedgesIE;
	window.onresize=getedgesIE;
}

if(document.layers) {
	document.captureEvents(Event.MOUSEMOVE);
}
document.onmousemove=newPos;
