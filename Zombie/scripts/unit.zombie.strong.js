unit.zombie.strong = function(line) {
	var $zombie = unit.zombie.call(this, line);
	$zombie.addClass('strong');

	function blink($element, blinkCount, blinkSpeed) {
		for (var i = 0; i < blinkCount; i++) {
			$element.fadeOut(blinkSpeed).fadeIn(blinkSpeed);
		}
	}

	this.allHealth = 70;
	this.leftHealth = this.allHealth;
	this.speed = 2;

	var baseDie = this.die;

	this.die = function() {
		blink($zombie, 5, 50);
		$zombie.fadeOut(100, function() {
			baseDie();
		});
	};
}