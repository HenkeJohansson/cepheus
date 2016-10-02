(function($) {
	'use strict';
	
	var $wrapper = $('.wrapper');
	var $terminal = $wrapper.find('.terminal');
	var $topbar = $terminal.find('.top-bar');
	var $terminalWindow = $terminal.find('.window');
	var $terminalInput = $terminal.find('input.comand');
	var compName = '[mainframe] ~ $ ';
	var commandsHistory = [];

	$terminal.on('click', focusInput);

	$terminalInput.on('keyup', function(e) {
		command(e);
	});


	function render() {
		$terminalWindow.html('');
		$.each(commandsHistory, function() {
			$terminalWindow.append(this);
		});
	}

	function command(e) {
		if ( e.keyCode === 13 ) {
			console.log('input', e);
			updateWindow();
			$terminalInput.val('');
		}
	}

	function updateWindow() {
		var command = compName + $terminalInput.val();
		var commandLine = $('<p>', {
			html: command
		});
		commandsHistory.push(commandLine);
		render();
	}

	function focusInput() {
		$terminalInput.focus();
	}



})(jQuery);