unit.zombie = function(line) {
	
	var $zombie = $('<div>').addClass('zombie');
	var fieldLine = $('#field .field-line').get(line);
	$(fieldLine).append($zombie);

	this.move = function() {
		$zombie.css({ left: $zombie.position().left - 1 });
	};

	this.die = function() {
		$zombie.remove();
	};

	this.isInTheEnd = function() {
		return $zombie.position().left <= 0;
	};

	return $zombie;
}