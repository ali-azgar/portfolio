function onLogin(password) {
	if (password === key) {
		location.href = output;
	}
	else {
		alert("Wrong password");
	}
}

let input = "nyvqrmvtaf.pbz/EE.ugzy";
let pre = "uggcf://"

let spel = "Nsenunyv"

function isLowercase(char) {
	var charCode = char.charCodeAt(0);
	return charCode >= 97 && charCode <= 122;
}

function isUppercase(char) {
	var charCode = char.charCodeAt(0);
	return charCode >= 65 && charCode <= 90;
}

function rotateChar(char, offset) {
	return String.fromCharCode(((char.charCodeAt(0) - offset + 13) % 26) + offset);
}

function rot13(text) {
	return text.split("").map(function (char) {
		var offset;
		if (isLowercase(char))
			offset = 97;
		else if (isUppercase(char))
			offset = 65;
		else
			return char;
		return rotateChar(char, offset);
	}).join("");
}

let output = rot13(pre) + rot13(input);
console.log(output);
let key = rot13(spel);