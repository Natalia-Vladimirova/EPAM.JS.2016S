function random(min, max) {
	return Math.floor((Math.random() * max) + min);
}

$(function() {
	disableButtons(false, true, true);

	function disableButtons(generate, setColor, reset) {
		$('#generate').attr('disabled', generate);
		$('#setColor').attr('disabled', setColor);
		$('#reset').attr('disabled', reset);
	}

	function generateField() {
		var cellCount = random(50, 100);

		for (var i = 0; i < cellCount; i++) {
			var number = random(1, 100);
			var div = $("<div>").html(number).addClass('cell');
			$('#field').prepend(div);  
		}
	}

	function setCellColor(element) {
		var value = $(element).text();

		if (value > 75) {
			$(element).css('background-color', '#f44336');
		}
		else if (value > 50) {
			$(element).css('background-color', '#ff9800');
		}
		else if (value > 25) {
			$(element).css('background-color', '#4caf50');
		}
	}

	function setFieldColor() {
		$('#field .cell').each(function() {
			setCellColor(this);
		});
	}

	$('#generate').on('click', function() {
		generateField();
		disableButtons(true, false, false);
	});

	$('#setColor').on('click', function() {
		setFieldColor();
		disableButtons(true, true, false);
	});

	$('#reset').on('click', function() {
		$('#field .cell').remove();
		disableButtons(false, true, true);
	});
});