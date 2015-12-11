/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber(),
    allowedGuesses = 5,
    prevGuesses = [];

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random() * 100);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = +$('#guess').val();
	$('#guess').val('');

	var message = "";
	if (checkGuess()) {
		winOrLose('win');
	} else {
		if (prevGuesses.indexOf(playersGuess) === -1) {
			prevGuesses.push(playersGuess);

			if (prevGuesses.length + 1 > allowedGuesses) {
				winOrLose('lose');
			}

			message = guessMessage();
			$('.previous').text(prevGuesses);
		} else {
			message = "Duplicate guess.";
		}
	}

	$('#alert-box').removeClass('hidden');
	$('#alert-box').text(message);
	updateGuesses();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	var lowOrHigh = '';

	if (playersGuess > winningNumber) {
		lowOrHigh = 'higher';
	} else {
		lowOrHigh = 'lower';
	}

	return lowOrHigh;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	return (winningNumber === playersGuess);
}

function guessMessage(){
	var distance = Math.ceil(Math.abs(winningNumber - playersGuess) / 5) * 5;

	return "Your guess is " + lowerOrHigher() + " and within " + distance + " digits of the winning number.";
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var nums = [Math.floor(Math.random() * 100), winningNumber, Math.floor(Math.random() * 100)];

	$('#alert-box').text("One of the following is the winning number: " + nums);
	$('#alert-box').removeClass('hidden');
}

// Update text to show remaining guesses

function updateGuesses() {
	$('#remaining').text('You have ' + (allowedGuesses - prevGuesses.length) + ' guesses left.');
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	prevGuesses = [];
	updateGuesses();
	$('body').removeClass('winner loser');
	$('#alert-box').text("Your game has been restarted!");
	$('#remaining').show();
	$('#alert-box').show();
	$('.panel-header').text('Enter a number between 1 and 100!');
}

function winOrLose(result) {
	if (result === 'win') {
		$('body').addClass('winner');
		$('#remaining').hide();
		$('.panel-header').text('You won!');
		$('.previous').hide();

	} else {
		$('body').addClass('loser');
		$('.panel-header').text('You lost, try again!');
		$('#remaining').hide();
		$('#alert-box').hide();
		$('.previous').hide();
	}
}

/* **** Event Listeners/Handlers ****  */

updateGuesses();

$('#hint').on('click', provideHint);

$('#guess').keypress(function(event) {
	if (event.which === 13) {
		$('.submit').click();
	}
});