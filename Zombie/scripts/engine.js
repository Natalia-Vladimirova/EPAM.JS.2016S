function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

$(function() {
	var zombies = [];
	var gameId;
	var gameIsStarted = false;
	var zombieMovingMethod = makeZombieToMove;

	$('#btnPlayGame').on('click', function() {

		var $this = $(this);

		if (gameIsStarted) {
			gameIsStarted = false;
			$this.text('Start game');
			clearInterval(gameId);
			clearAllZombies();
		}
		else {
			gameIsStarted = true;
			$this.text('Stop game');
			generateZombie();
			gameId = setInterval(generateZombie, 4000);
			$('.game-over').fadeOut(0);
		}

	});

	$('#btnSlowUp').on('click', function() {
		changeZombiesMovingMethod(makeZombieToMoveSlow);
		setTimeout(changeZombiesMovingMethod, 10000, makeZombieToMove);
	});

	$('#btnGrowOld').on('click', function() {
		var id = setInterval(function() {
			zombies.forEach(function(item, i, arr) {
				decreaseZombieHealth(item, i, arr, 1);
			});
		}, 1000);

		setTimeout(function() {
			clearInterval(id);
		}, 10000);
	});

	$('#btnExplode').on('click', function() {
		zombies.forEach(function(item, i, arr) {
			decreaseZombieHealth(item, i, arr, 15);
		});
	});

	function generateZombie() {
		var zombie = createRandomZombie();
		var id = setInterval(zombieMovingMethod, 100, zombie);
		zombies[zombies.length] = { zombie: zombie, id: id };
	}

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
			gameOver();
		}
	}

	function makeZombieToMoveSlow(zombie) {
		zombie.moveWithMinSpeed();

		if (zombie.isInTheEnd()) {
			gameOver();
		}
	}

	function changeZombiesMovingMethod(movingMethod) {
		zombieMovingMethod = movingMethod;

		zombies.forEach(function(item, i, arr) {
			if (item) {
				clearInterval(item.id);
				var id = setInterval(movingMethod, 100, item.zombie);
				arr[i].id = id;
			}
		});
	}

	function decreaseZombieHealth(item, i, arr, decreaseCount) {
		if (item) {
			var oldHealth = item.zombie.health();
			item.zombie.health(oldHealth - decreaseCount);

			if (!item.zombie.health()) {
				clearInterval(item.id);
				item.zombie.die();
				arr[i] = null;
			}
		}
	}

	function clearAllZombies() {
		zombies.forEach(function(item) {
			if (item) {
				clearInterval(item.id);
				item.zombie.die();
			}
		});
		zombies = [];
	}

	function gameOver() {
		clearInterval(gameId);
		clearAllZombies();
		$('.game-over').fadeIn(500);
		$('#btnPlayGame').text('Start game');
	}

});