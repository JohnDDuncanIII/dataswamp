/* Person definition */
function User(options) {
    var state = {
	//Struct : "User",
	FirstName : "",
	LastName : "",
	Sex : undefined,
	Age : undefined,
	Attr : undefined
    }

    for (var prop in options) {
	if (!state.hasOwnProperty(prop))
	    console.log("Property " + prop + " not recognized in object " + state);
	state[prop] = options[prop];
    }

    this.getFirstName = function () {
	return state.FirstName;
    }

    this.getLastName = function() {
	return state.LastName;
    }

    this.getAge = function() {
	return state.Age;
    }

    this.getSex = function() {
	return state.Sex;
    }

    this.getAttr = function() {
	return state.Attr;
    }

    this.setFirstName = function (f) {
	state.FirstName = f;
    }

    this.setLastName = function(l) {
	state.LastName = l;
    }

    this.setAge = function(a) {
	state.Age = a;
    }

    this.setSex = function(g) {
	state.Sex = g;
    }

    this.setAttr = function(a) {
	state.Attr = a;
    }

    this.toJSON = function() {
	return JSON.stringify(state);
    }

    return this;  // Just to be explicit
}
select = document.getElementById("select");

function populate_fields() {
    var cur_person = people_local[select.selectedIndex];
    firstName.value = cur_person.getFirstName();
    lastName.value = cur_person.getLastName();
    age.value = cur_person.getAge();
    var gender = cur_person.getSex();
    if(gender == "Male") { male.checked=true; }
    if(gender == "Female") { female.checked=true; }
    if(gender == "Other") { other.checked=true; }

    var attr_arr = cur_person.getAttr();

    for(var i = 0; i < attr_arr.length; i++) {
	var cbox = document.getElementById("c"+(i+1));
	cbox.checked = attr_arr[i];
    }
}

function create_user() {
    var new_user = new User({FirstName: "New", LastName: "User", Age: 0, gender: "Male", Attr: [false, false, false, false]});
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

function update_option_name() {
    var to_return = "";
    var first = firstName.value;
    var last = lastName.value;
    var a = age.value;

    var arr_val = people_local[select.selectedIndex];
    arr_val.setFirstName(first);
    arr_val.setLastName(last);
    arr_val.setAge(parseInt(a));
    if(male.checked) { arr_val.setSex("Male"); }
    if(female.checked) { arr_val.setSex("Female"); }
    if(other.checked) { arr_val.setSex("Other"); }

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

function save_data() {
    var people = new Array();
    for (i = 0; i < people_local.length; i++) {
	people.push(JSON.parse(people_local[i].toJSON()));
    }
    localStorage.setItem("Users", JSON.stringify(people));

    var f = document.createElement("form");
    f.setAttribute('method',"post");
    f.setAttribute('action',"/save/");
    f.setAttribute('style',"display:none;");

    var i = document.createElement("input"); //input element, text
    i.setAttribute('type',"hidden");
    i.setAttribute('name',"json");
    i.setAttribute('value', JSON.stringify(people));

    var s = document.createElement("input"); //input element, Submit button
    s.setAttribute('type',"submit");
    s.setAttribute('value',"Submit");

    f.appendChild(i);
    f.appendChild(s);
    document.body.appendChild(f);
    f.submit();

    console.log("saving");
}

var httpReq = new XMLHttpRequest(); // a new request
httpReq.open("GET", "http://localhost:8080/data/users.json", false);
httpReq.send(null);

var people_local;

// create a person object, and show that the printFirstName function is accessible.
//if(localStorage.getItem("Users") == undefined) {
if(httpReq.status == 404) {
    console.log("generating sample users and writing to localstorage");
    john = new User({FirstName: "John", LastName: "Duncan", Age: 21, Sex: "Male", Attr: [true, true, true, true]});
    patty = new User({FirstName: "Patty", LastName: "Jordan", Age: 58, Sex: "Female", Attr: [false, true, false, true]});
    charlie = new User({FirstName: "Charlie", LastName: "Vasquez", Age: 25, Sex: "Other", Attr: [true, false, true, false]});


    // Let's create an array, but I am going to cheat so I don't have to format
    // a string...
    var people = new Array();
    people.push(JSON.parse(john.toJSON()));
    people.push(JSON.parse(patty.toJSON()));
    people.push(JSON.parse(charlie.toJSON()));
    localStorage.setItem("Users", JSON.stringify(people));
    people_local = JSON.parse(localStorage.getItem("Users"));
} else {
    people_local = JSON.parse(httpReq.responseText);
}

// get the array from local storage, and make it into a array
// of people again...
 

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
    people_local[i] = new User(people_local[i]);
    var x = document.createElement("option");
    x.value = people_local[i].getFirstName();
    var t = document.createTextNode(people_local[i].getFirstName() + " " + people_local[i].getLastName());
    x.appendChild(t);
    select.appendChild(x);
    select.size = i+1;
}

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

select.onchange = populate_fields;
populate_fields();

var create = document.getElementById("new");
create.onclick = create_user;

var remove = document.getElementById("remove");
remove.onclick = delete_user;

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

var save = document.getElementById("save");
save.onclick = save_data;

var hide_name = document.getElementById("hide_name");
var hide_attr = document.getElementById("hide_attr");
