function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

$(function() {
	var currentGameId;
	var currentBombId;

	$('#startStop').on('click', function() {
		var $this = $(this);
		$this.toggleClass(function() {
			if ($this.hasClass('start')) {
				$this.removeClass('start');
				$this.text('Stop');
				playGame();
				return 'stop';
			}
			else {
				$this.removeClass('stop');
				$this.text('Start');
				stopGame();
				return 'start';
			}
		});
	});

	$('#resourceField').on('click', 'div:not(.bomb)', function() {
		var $this = $(this);
		$this.removeClass('resource');
		var resourceClass = $this.attr('class');
		updateResourceCount($('#' + resourceClass + 'Count'), 1);
		cleanResource($this);
	});

	function playGame() {
		startGame();
		
		currentGameId = setInterval(
			showResource, 
			700, 
			getRandomResourceName, 
			cleanResource, 
			1000);

		currentBombId = setInterval(
			showResource, 
			7000, 
			function() { return 'bomb'; }, 
			detonateBomb, 
			3000);
	}

	function startGame() {
		$('#resourceField div:not(.bomb)').each(function() {
			updateTimeout(cleanResource, 1000, $(this));
		});
		$('#resourceField div.bomb').each(function() {
			updateTimeout(detonateBomb, 3000, $(this));
		});
	}

	function updateTimeout(callback, timeout, $element) {
		var timeoutId = setTimeout(callback, timeout, $element);
		$element.attr('id', timeoutId);
	}

	function showResource(getResourceClass, callback, timeout) {
		var $resource = generateResource(getResourceClass());
		var timeoutId = setTimeout(callback, timeout, $resource);
		$resource.attr('id', timeoutId);
	}

	function stopGame() {
		clearInterval(currentGameId);
		clearInterval(currentBombId);

		$('#resourceField div').each(function() {
			var $this = $(this);
			var id = $this.attr('id');
			clearTimeout(id);
			$this.removeAttr('id');
		});
	}

	function generateResource(resourceClass) {
		var $resource = $('<div>').addClass('resource').addClass(resourceClass);
		placeResourceOnField($resource);
		return $resource;
	}

	function placeResourceOnField($element) {
		var $field = $('#resourceField');
		$field.append($element);
		var top = random(0, $field.height() - $element.height());
		var left = random(0, $field.width() - $element.width());
		$element.css({ top: top, left: left, opacity: 0 });
		$element.animate({ opacity: 1 }, 500);
	}

	function getRandomResourceName() {
		var resources = ['cheese', 'orange', 'cherry', 'pumpkin'];
		var resIndex = random(0, resources.length);
		return resources[resIndex];
	}

	function cleanResource($resource) {
		$resource.remove();
	}

	function detonateBomb($bomb) {
		var randomResourceName = getRandomResourceName();
		var $randomResource = $('#' + randomResourceName + 'Count');
		updateResourceCount($randomResource, -10);
		$bomb.remove();
	}

	function updateResourceCount($resource, value) {
		var oldValue = $resource.text();
		if (oldValue === '-' && value > 0) {
			$resource.text(value);
		}
		else {
			var newValue = +oldValue + value;
			if (newValue > 0) {
				$resource.text(newValue);
			}
			else {
				$resource.text('-');
			}
		}
	}

});