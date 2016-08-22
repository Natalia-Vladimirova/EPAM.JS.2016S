unit.zombie.michael = function(line) {
	var $zombie = unit.zombie.call(this, line);
	$zombie.addClass('michael');

	this.speed = 3;

	var baseDie = this.die;

	this.die = function() {
		$zombie.fadeOut(700, function() {
			baseDie();
		});
	};
}