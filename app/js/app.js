(function($) {
	'use strict';
	
	var $wrapper = $('.wrapper');
	var $terminal = $wrapper.find('.terminal');
	var $topbar = $terminal.find('.top-bar');
	var $terminalWindow = $terminal.find('.window');
	var $terminalInput = $terminal.find('input.comand');
	var compName = '[mainframe] ~ $ ';
	var windowHistory = [];
	var commandHistory = [];
	var subDir = [
		{
			name: 'projects',
			type: 'folder'
		},
		{
			name: 'info',
			type: 'folder'
		},
		{
			name: 'cv',
			type: 'folder'
		},
		{
			name: 'avatar.jpg',
			type: 'image'
		}
	];

	$terminal.on('click', focusInput);

	$terminalInput.on('keyup', function(e) {
		command(e);
	});


	function render() {
		$terminalWindow.html('');
		$.each(windowHistory, function() {
			$terminalWindow.append(this);
		});
	}

	function command(e) {
		if ( e.keyCode === 13 ) {
			storeComando();
			updateWindow();
			findFunc();
			$terminalInput.val('');
		}
		if ( e.keyCode === 38 ) {
			var commandIdx = commandHistory.length-1;
			cyclePrevComandos(commandIdx);
		}
	}

	function findFunc() {
		var command = $terminalInput.val();
		command = command.split(' ');
		var func = command[0];
		var value = command[1];
		if ( func === 'ls' ) {
			listDirs();
		} else if ( func === 'cd' ) {
			changeDir(value);
		}
	}

	function listDirs() {
		$.each(subDir, function() {
			var commandLine = $('<p>', {
				html: this.name,
				class: 'ls'
			});
			windowHistory.push(commandLine);
		});
		render();
	}

	function changeDir(value) {
		/**
		 * dunno
		 */

	}

	function storeComando() {
		commandHistory.push($terminalInput.val());
	}

	function cyclePrevComandos(commandIdx) {
		var commando = commandHistory[commandIdx];
		$terminalInput.val(commando);
	}

	function updateWindow() {
		var command = compName + $terminalInput.val();
		var commandLine = $('<p>', {
			html: command
		});
		windowHistory.push(commandLine);
		render();
	}

	function focusInput() {
		$terminalInput.focus();
	}



})(jQuery);