for (var i = 0; i < data.length; i++) {

	var result;

	if (data[i] === undefined) {
		result = 'undefined value';
	}
	else if (data[i] === null) {
		result = 'null value';
	}
	else {
		result = data[i];
	}
	
	console.log("data[%s] = %s", i, result);
}