/* Person definition */
function Person(options) {
    var state = {
		instanceType : "Person",
		fname : "",
		lname : "",
		age : undefined,
		gender : undefined,
		attr : undefined
    }

    for (var prop in options) {
		if (!state.hasOwnProperty(prop))
			console.log("Property " + prop + " not recognized in object " + state.instanceType);
		state[prop] = options[prop];
    }

    this.getFirstName = function () {
		return state.fname;
    }

    this.getLastName = function() {
		return state.lname;
    }

    this.getAge = function() {
		return state.age;
    }

    this.getGender = function() {
		return state.gender;
    }

	this.getAttr = function() {
		return state.attr;
	}

    this.setFirstName = function (f) {
		state.fname = f;
    }

    this.setLastName = function(l) {
		state.lname = l;
    }

    this.setAge = function(a) {
		state.age = a;
    }

    this.setGender = function(g) {
		state.gender = g;
    }

	this.setAttr = function(a) {
		state.attr = a;
	}

    this.toJSON = function() {
		return JSON.stringify(state);
    }

    return this;  // Just to be explicit
}
select = document.getElementById("select");

// create a person object, and show that the printFirstName function is accessible.
if(localStorage.getItem("PeopleData") == undefined) {
    console.log("generating sample users and writing to localstorage");
    john = new Person({fname: "John", lname: "Duncan", age: 21, gender: "Male", attr: [true, true, true, true]});
    patty = new Person({fname: "Patty", lname: "Jordan", age: 58, gender: "Female", attr: [false, true, false, true]});
    charlie = new Person({fname: "Charlie", lname: "Vasquez", age: 25, gender: "Other", attr: [true, false, true, false]});


    // Let's create an array, but I am going to cheat so I don't have to format
    // a string...
    var people = new Array();
    people.push(JSON.parse(john.toJSON()));
    people.push(JSON.parse(patty.toJSON()));
    people.push(JSON.parse(charlie.toJSON()));
    localStorage.setItem("PeopleData", JSON.stringify(people));
}



// get the array from local storage, and make it into a array
// of people again...
var people_local = JSON.parse(localStorage.getItem("PeopleData"));
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var age = document.getElementById("age");
var male = document.getElementById("male");
var female = document.getElementById("female");
var other = document.getElementById("other");
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");
var c4 = document.getElementById("c4");

for (var i = 0; i < people_local.length; i++) {
    people_local[i] = new Person(people_local[i]);
    var x = document.createElement("option");
    x.value = people_local[i].getFirstName();
    var t = document.createTextNode(people_local[i].getFirstName() + " " + people_local[i].getLastName());
    x.appendChild(t);
    select.appendChild(x);
    select.size = i+1;
}

select.onchange = populate_fields;

function populate_fields() {
    var cur_person = people_local[select.selectedIndex];
    firstName.value = cur_person.getFirstName();
    lastName.value = cur_person.getLastName();
    age.value = cur_person.getAge();
    var gender = cur_person.getGender();
    if(gender == "Male") { male.checked=true; }
    if(gender == "Female") { female.checked=true; }
    if(gender == "Other") { other.checked=true; }

	var attr_arr = cur_person.getAttr();

	for(var i = 0; i < attr_arr.length; i++) {
		var cbox = document.getElementById("c"+(i+1));
			cbox.checked = attr_arr[i];
	}
}

populate_fields();


var create = document.getElementById("new");
create.onclick = create_user;

var remove = document.getElementById("remove");
remove.onclick = delete_user;

function create_user() {
    var new_user = new Person({fname: "New", lname: "User", age: "", gender: "Male", attr: [false, false, false, false]});
    people_local.push(new_user);
    var x = document.createElement("option");
    x.value = people_local[select.size].getFirstName();
    var t = document.createTextNode(people_local[select.size].getFirstName() + " " + people_local[select.size].getLastName());
    x.appendChild(t);
    select.appendChild(x);
    select.size = select.size+1;
    select.selectedIndex = select.size-1;
    select.onchange();
}

function delete_user() {
    if (select.selectedIndex > -1) {
		var select_index = select.selectedIndex;
		people_local.splice(select_index, 1);

		if (select_index != 0) {
			select.selectedIndex = select_index-1;
		} else {
			select.selectedIndex = select_index+1;
		}

		select.options.remove(select_index);
		select.size = select.size-1;

    }
    if(select.size > 0) {
		select.onchange();
    } else {
		firstName.value = "";
		lastName.value = "";
		male.checked=true;
		age.value = "";
    }
}

firstName.onchange = update_option_name;
lastName.onchange = update_option_name;
age.onchange = update_option_name;
male.onclick = update_option_name;
female.onclick = update_option_name;
other.onclick = update_option_name;
c1.onchange = update_option_name;
c2.onchange = update_option_name;
c3.onchange = update_option_name;
c4.onchange = update_option_name;


function update_option_name() {
    var to_return = "";
    var first = firstName.value;
    var last = lastName.value;
    var a = age.value;

    var arr_val = people_local[select.selectedIndex];
    arr_val.setFirstName(first);
    arr_val.setLastName(last);
    arr_val.setAge(a);
    if(male.checked) { arr_val.setGender("Male"); }
    if(female.checked) { arr_val.setGender("Female"); }
    if(other.checked) { arr_val.setGender("Other"); }

	var attr_c = arr_val.getAttr();
	for(var i = 0; i < attr_c.length; i++) {
		attr_c[i] = document.getElementById("c"+(i+1)).checked;
	}
	arr_val.setAttr(attr_c);

    var x = select.options[select.selectedIndex];
    x.removeChild(x.firstChild);
    x.value = first;
    var t = document.createTextNode(first + " " + last);
    x.appendChild(t);
}


var save = document.getElementById("save");
save.onclick = save_data;

function save_data() {
    var people = new Array();
    for (i = 0; i < people_local.length; i++) {
		people.push(JSON.parse(people_local[i].toJSON()));
    }
    localStorage.setItem("PeopleData", JSON.stringify(people));
}

var hide_name = document.getElementById("hide_name");
var hide_attr = document.getElementById("hide_attr");

//hide_name.onclick = hide_div;
//hide_attr.onclick = hide_div;

function hide_div(e) {
	var m_div = document.getElementById(e.id.substring(e.id.indexOf("_")+1, e.id.length));
	if(e.textContent == "Hide") {
		m_div.style.display = "none";
		e.textContent = "Show";
	} else {
		m_div.style.display = "block";
		e.textContent = "Hide";
	}
}
