function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

$(function() {
	var zombies = [];

	$('#btnGenerate').on('click', function() {
		var zombie = createRandomZombie();
		var id = setInterval(makeZombieToMove, 100, zombie);
		zombies[zombies.length] =  { zombie: zombie, id: id };
	});

	function createRandomZombie() {
		var zombie;
		var randomLine = random(0, 5);
		var randomNumber = random(0, 2);

		switch (randomNumber)
		{
			case 0:
				zombie = new unit.zombie.michael(randomLine);
				break;
			case 1:
				zombie = new unit.zombie.strong(randomLine);
				break;
		}

		return zombie;
	}

	function makeZombieToMove(zombie) {
		zombie.move();

		if (zombie.isInTheEnd()) {

			zombies.forEach(function(item) {
				clearInterval(item.id);
				item.zombie.die();
			});

			zombies = [];
			$('.game-over').fadeIn(500);
		}
	}

});