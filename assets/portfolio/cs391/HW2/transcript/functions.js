var numFields = 3;
/* Functions to be implemented using non-intrusive JavaScript. */
var gpaMap = {
    "A": 4.0,
    "A-": 3.67,
    "B+": 3.33,
    "B": 3.000,
    "B-": 2.67,
    "C+": 2.33,
    "C": 2.000,
    "C-": 1.67,
    "D+": 1.33,
    "D": 1,
    "D-": 0.67,
    "F": 0
};

/* 
   Implement an onchange event handler to calculate the QP's for a class if 
   the grade or the number of credits changes.
*/
function recalculateQPs(index) {
    var curQPA = document.getElementsByName("QPA"+index)[0];
    var curGrade = document.getElementsByName("grade"+index)[0];
    curQPA.value = gpaMap[curGrade.value.toUpperCase()];
}

document.getElementsByName("credit"+1)[0].oninput = function() { recalculateQPs(1) };
document.getElementsByName("grade"+1)[0].oninput = function() { recalculateQPs(1) };
document.getElementsByName("credit"+2)[0].oninput = function() { recalculateQPs(2) };
document.getElementsByName("grade"+2)[0].oninput = function() { recalculateQPs(2) };
document.getElementsByName("credit"+3)[0].oninput = function() { recalculateQPs(3) };
document.getElementsByName("grade"+3)[0].oninput = function() { recalculateQPs(3) };

/*
  Implement a function to calculate the overall QPA for the students.
*/
function calculateQPA() {
    var QPA = 0;
    var creditHours = 0;
    for(var i=1; i<=numFields; i++) {
	var x = document.getElementsByName("grade"+i)[0];
	var cred = document.getElementsByName("credit"+i)[0];
	var val = gpaMap[x.value.toUpperCase()];
	creditHours += parseInt(cred.value);
	if(val != undefined) { QPA += val; } 
	else { alert("One of your grades is invalid!"); }
    }
    QPA /= numFields;
    QPA *= creditHours;
    document.getElementsByName("QPA")[0].value = QPA;
}
document.getElementsByName("QPAButton")[0].onclick = calculateQPA;
