var quiz = {
	quizQuestions: [],
	quizChoices: [],
	quizAnswers: [],
	addQuizQuestions: function(questions) {
		return this.quizQuestions.push(questions);
	},
	addQuizChoices: function(choices) {
		return this.quizChoices.push(choices);
	},
	addQuizAnswers: function(answers) {
		return this.quizAnswers.push(answers);
	},
	quizLooping: function(quizArray) {
		for (var i = 0; i < quizArray.length; i++) {
			return quizArray[i];
		}
	}
};


//-------------- Questions ------------//
quiz.addQuizQuestions("Who painted the mona lisa?");
quiz.addQuizQuestions("What gets wetter as it dry's?");
quiz.addQuizQuestions("How do you make cereal?");
quiz.addQuizQuestions("What is 2 + 2?");
quiz.addQuizQuestions("Where does spongebob work?");

//----------------Choices--------------//
quiz.addQuizChoices(["George Washington", "Al Sharpton", "Leonardo DaVinci", "Your Grandma"]);
quiz.addQuizChoices(["A Shower", "A Towel","A Water Bottle","The Sun"]);
quiz.addQuizChoices(["Cereal then milk","Milk then cereal","Something sinister","I don't make my own cereal"]);
quiz.addQuizChoices(["0","22","1", "4"]);
quiz.addQuizChoices(["The chum bucket","The krusty krab","The goo lagoon","A gift shop"]);

//--------------RightAnswer------------//
quiz.addQuizAnswers("Leonardo DaVinci");
quiz.addQuizAnswers("A Towel");
quiz.addQuizAnswers("Cereal then milk");
quiz.addQuizAnswers("4");
quiz.addQuizAnswers("The krusty krab");

//-------------------------The Logic----------------------------//
var score;
var finalScore;
var counter;
var state = true;
var startButton = document.querySelector(".start-button");
var playAgain = document.querySelector(".back-to-start");
var container = document.querySelector(".container");
var questionArea = document.querySelector(".question-area");
var choiceArea = document.querySelectorAll("li");
var answerInput = document.querySelector(".user-answer");
var correctAnswer = document.querySelector(".answer-area");
var scoreDisplay = document.querySelector(".score");
var nextButton = document.querySelector(".next");
var numOfQuestions = document.querySelector(".num-of-questions");
score = 0;
counter = 0;

function classes() {
	for (var a = 0; a < choiceArea.length; a++) {
		if (choiceArea[a].classList.contains("correct")) {
			choiceArea[a].classList.remove("correct");
		} else if (choiceArea[a].classList.contains("incorrect")) {
			choiceArea[a].classList.remove("incorrect");
		}
	};
};

function clearFields() {
	for (var a = 0; a < choiceArea.length; a++) {
		if (choiceArea[a].classList.contains("correct") || choiceArea[a].classList.contains("incorrect")) {
			choiceArea[a].style.visibility = "visible";
			state = false;
		} else {
			choiceArea[a].style.visibility = "hidden";
			state = false;
		}
	};
};

function borderClasses() {
	if (answerInput.innerHTML === "Correct") {
		answerInput.classList.add("correct-border");
	} else if (answerInput.innerHTML === "Incorrect") {
		answerInput.classList.add("incorrect-border");
	}
};

function clearBorders() {
	if (answerInput.classList.contains("correct-border")) {
		answerInput.classList.remove("correct-border");
	} else if (answerInput.classList.contains("incorrect-border")) {
		answerInput.classList.remove("incorrect-border");
	}
};

function StartQuiz() {
	if (counter < quiz.quizQuestions.length) {
		numOfQuestions.innerHTML = "Question " + (counter + 1) + " out of " + quiz.quizQuestions.length;
		answerInput.style.visibility = "hidden";
		nextButton.style.visibility = "hidden";
		correctAnswer.style.visibility = "hidden";
		scoreDisplay.innerHTML = "Your Score is: " + score;
		quiz.quizLooping(quiz.quizChoices[counter]);
	 }
};

function quizDisplay() {
	StartQuiz();
	questionArea.innerHTML = quiz.quizQuestions[counter];
	for (var a = 0; a < choiceArea.length; a++) {
		choiceArea[a].style.visibility = "visible";
		choiceArea[a].innerHTML = quiz.quizChoices[counter][a];
	};
};

function elementDisplay() {
	answerInput.style.visibility = "visible";
	correctAnswer.style.visibility = "visible";
	nextButton.style.visibility = "visible";
	scoreDisplay.innerHTML = "Your Score is: " + score;

};

choiceArea.forEach(function(element) {
	element.addEventListener("click", function(event) {
		if (state === true) {
			if (element.textContent === quiz.quizAnswers[counter]) {
				score += 10;
				answerInput.innerHTML = "Correct";
				elementDisplay();
				element.classList.add("correct");
				borderClasses();
				clearFields();
				correctAnswer.innerHTML = "Awesome Job! The Correct Answer Is: " + quiz.quizAnswers[counter];
			} else {
				if (score === 0) {
					score = score;
					answerInput.innerHTML = "Incorrect";
					elementDisplay();
					element.classList.add("incorrect");
					borderClasses();
					correctAnswer.innerHTML = "Ohh! Sorry, The Correct Answer Is: " + quiz.quizAnswers[counter];
					clearFields();
				} else if (score > 0) {
					score -= 5;
					answerInput.innerHTML = "Incorrect";
					elementDisplay();
					element.classList.add("incorrect");
					borderClasses();
					correctAnswer.innerHTML = "Ohh! Sorry, The Correct Answer Is: " + quiz.quizAnswers[counter];
					clearFields();
				}
			}
		}
	});
});

startButton.addEventListener("click", function() {
	startButton.style.display = "none";
	container.style.display = "block";
	for (var a = 0; a < choiceArea.length; a++) {
		choiceArea[a].style.display = "block";
	};
	quizDisplay();
	clearBorders();
});

nextButton.addEventListener("click", function() {
	if (counter === quiz.quizQuestions.length - 1) {
		state = false;
		playAgain.style.visibility = "visible";
		numOfQuestions.innerHTML = "Question " + (counter + 1) + " out of " + quiz.quizQuestions.length;
		nextButton.style.visibility = "hidden";
		choiceArea.forEach(function(element) {
			element.textContent = "Thank God, It's Finally Over! Good Ridence!";
		});
		finalScore = (score / quiz.quizQuestions.length) * 10;
		scoreDisplay.innerHTML = "Your Final Score is: " + finalScore + "%";
			if (finalScore < 80) {
				answerInput.classList.add("incorrect-border");
				answerInput.textContent = "You Failed...";
			} else {
				answerInput.classList.add("correct-border");
				answerInput.textContent = "You Passed!";
			}
	} else {
		counter++;
		state = true;
		clearBorders();
		classes();
		StartQuiz();
		quizDisplay();
	};
});

playAgain.addEventListener("click", function() {
	score = 0;
	counter = 0;
	state = true;
	clearBorders();
	classes();
	init();
	quizDisplay();
});

function init() {
	startButton.style.display = "block";
	playAgain.style.visibility = "hidden";
	container.style.display = "none";
	for (var a = 0; a < choiceArea.length; a++) {
		choiceArea[a].style.display = "none";
	};
};

init();
