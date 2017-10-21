function getAge(dStr) {
    var today = new Date();
    var birthDate = new Date(dStr);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if ((month === 0 && 
	 today.getDate() < birthDate.getDate()) 
	|| month < 0) {
        age--;
    }
    console.log('age: ' + age);
    document.getElementById("age").value = age;
    return age;
}

