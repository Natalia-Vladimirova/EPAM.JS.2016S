function log(type, count) {
	console.log('type = %s, count = %s', type, count);
}

function countOfType(data) {

	for (var i = 1; i <= 3; i++) {

		var totalCount = 0;
		var method = 'getCount' + i;

		for (var j = 0; j < data.length; j++) {

			var getCount = data[j][method];

			if (getCount === undefined) {
				continue;
			}

			totalCount += getCount.call(data[j]);
		}

		console.log('count%s = %s', i, totalCount);
	}
}