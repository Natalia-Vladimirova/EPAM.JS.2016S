unit.zombie = function(line) {
	
	var $healthLeft = $('<div>').addClass('left');
	var $health = $('<div>').addClass('health').html($healthLeft);
	var $zombie = $('<div>').addClass('zombie').html($health);
	var fieldLine = $('#field .field-line').get(line);
	$(fieldLine).append($zombie);

	this.allHealth = 50;
	this.leftHealth = this.allHealth;
	this.minSpeed = 1;
	this.speed = this.minSpeed;

	this.health = function(value) {
		//getter
		if (!arguments.length) {
			return this.leftHealth;
		}

		//setter
		if (value > this.allHealth) {
			throw new Error("Health must be less than " + this.allHealth);
		}

		if (value <= 0) {
			this.leftHealth = 0;
		}
		else {
			this.leftHealth = value;
		}

		var healthPercent = (this.leftHealth / this.allHealth) * 100;
		$zombie.find('.health .left').css({ width: healthPercent + '%' });
	};

	this.move = function() {
		$zombie.css({ left: $zombie.position().left - this.speed });
	};

	this.moveWithMinSpeed = function() {
		$zombie.css({ left: $zombie.position().left - this.minSpeed });
	};

	this.die = function() {
		$zombie.remove();
	};

	this.isInTheEnd = function() {
		return $zombie.position().left <= 0;
	};

	return $zombie;
}