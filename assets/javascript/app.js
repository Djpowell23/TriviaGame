// Object with Questions, Answers
var myQuestions = [
    // Question 1
    {question: "What is Harry Potter's owl's name?",
    answers: {a:'Hermes', b:'Percival', c:'Hedwig', d:'Scabbers'},
    correctAnswer: 'c',
    text: 'Hedwig'},
    // Question 2
    {question:"What is the name of the creator of the Philospher's Stone?",
    answers: {a:'Nicholas Flamel', b:'Griselda Marchbanks', c:'Peter Pettigrew', d:'Alecto Carrow'},
    correctAnswer:'a',
    text:'Nicholas Flamel'},
    // Question 3
    {question:"How many staircases are in Hogwarts Castle?",
    answers: {a:'76', b:'142', c:'336', d:'199'},
    correctAnswer:'b',
    text:'142'},
    // Question 4
    {question:"What is the name of the primary magical newspaper?",
    answers: {a:'The Muggle Update', b:'Monthly Magic', c: 'The Hogwarts Times', d: 'The Daily Prophet'},
    correctAnswer:'d',
    text:'The Daily Prophet'},
    // Question 5
    {question:"What is the name of the train station containing Platform 9-3/4?",
    answers: {a:"King's Cross Station", b:'The Underground Railway', c: "Hogwart's Express", d: 'Hogsmeade Landing'},
    correctAnswer: 'a',
    text: "King's Cross Station"},
    // Question 6
    {question:"What is the name of Dumbledore's phoenix?",
    answers: {a:'Ember', b:'Fawkes', c:'Fluffy', d:'Cat'},
    correctAnswer:'b',
    text:'Fawkes'},
    // Question 7
    {question:"What is the name of Harry's father?",
    answers: {a:'Albus', b:'James', c:'Kevin', d:'Cedric'},
    correctAnswer:'b',
    text:'James'},
    // Question 8
    {question:"Who was Harry's first kiss?",
    answers: {a:'Ginny Weasley', b:'Aunt Petunia', c:'Cho Chang', d:'Hermione Granger'},
    correctAnswer:'c',
    text:'Cho Chang'},
    // Question 9
    {question:"What are the animals called that pull the carriages at Hogwarts?",
    answers: {a:'Chimaera', b:'Griffin', c:'Thestral', d:'Troll'},
    correctAnswer:'c',
    text:'Thestral'},
    // Question 10
    {question:"Who is Fluffy?",
    answers: {a:'Three-Headed Dog', b:"Hagrid's Dragon", c:"Hermione's Cat", d:"Harry's Owl"},
    correctAnswer:'a',
    text:'Three-Headed Dog'},
]

// Document Ready Function
$(document).ready(function() {
    $(document).on('click', '#start', function(start) {
        // Variable to see if the user clicked an Answer
        var clickAnswer = false;

        // Variable used to show each question
        var i= -1;

        // Variable for how many the user has gotten correct
        var numCorrect = 0;

        // Sets Timer and Removes Start Button
        $('#timer').text('00:10');
        $('#start').remove();

        // Main Game Logic
        function generateQuiz (questions,quizContainer) {

            // Function that Generates Questions and Answers; Displays to HTML
            function showQuestions(questions, quizContainer) {
                var output = [];
                var answers = [];
                var userAnswer = '';

                // Increments i by 1 Each Time Function is Called 
                i++;
                console.log(i);

                // As long as i < # of Questions
                if (i < questions.length) {
                    // Creates Multiple Choice Answers From Object
                    for (letter in questions[i].answers) {
                        answers.push('<input type="radio" name="question' + i + '" value="'+ letter +'">' + questions[i].answers[letter] + '</label>');
                    };
                    // Output Displayed to HTML
                    output.push('<div class="question">' + questions[i].question + '</div>' + '<div class="answers">' + answers.join('<br>') + '</div>');
                    quizContainer.innerHTML = output.join('');

                    // When an Answer is Selected
                    $('#quiz').off().on('click', "input", function() {
                        // Resets timer to 2 seconds on answer screen
                        sec = '02';
                        // Stores User Guess as Variable
                        var userAnswer = $('input[name=question'+i+']:checked').val();
                        // Hides Timer until next question is revealed
                        $('#timer').hide();

                            // If user guess matches correct answer
                            if (userAnswer === questions[i].correctAnswer) {
                                // Increment Score by 1
                                numCorrect++;
                                // Display Result to HTML
                                quizContainer.innerHTML = '<p id="over">Correct! <br>' + numCorrect + ' out of ' + questions.length + '</p>';
                                // Troubleshoot to Console
                                console.log('right');
                                console.log(sec);

                                // If user Guess is wrong
                            } else {
                                // Display Result to HTML
                                quizContainer.innerHTML = '<p id="over">Wrong! <br>Correct Answer:<br>' + questions[i].correctAnswer + ') ' + questions[i].text + '<br>' + numCorrect + ' out of ' + questions.length + '</p>';
                                // Troubleshoot to Console
                                console.log('Wrong!');
                                console.log(sec);
                            };
                            // Answer has been clicked
                            return answerClick = true;
                    });

                    // If i is Equal to Array Length, the game will end; Button to Restart Game Displays
                } else {
                    clearInterval(timer);
                    $('#quiz').html('<p id="over"> Game Over <br>' + numCorrect + ' out of ' + questions.length + '</p>');
                    $('#quiz').append('<button id="start" type="button" class="btn btn-light">Play Again?</button>');
                };
            };

            // Calls Function to Show Each Question and Sets Timer
            showQuestions(questions, quizContainer);
            var min = '00';
            var sec = '10';

            // Timer Function
            var timer = setInterval(function() {
                $('#timer').html(min + ":" + sec);
                // Decrements Timer
                sec--;

                    // If Time Runs Out & Answer is Selected
                    if (sec < 0 && answerClick === true) {
                        // Call Function to Show Next Question
                        showQuestions(questions,quizContainer);
                        // Show Timer
                        $('#timer').show();
                        // Reset answerClick Variable
                        answerClick = false;
                        // Reset Timer
                        sec = '10';
                        // Add '0' to Timer if Time < 10 sec
                    } else if (sec < 10) {
                        sec = '0' + sec;

                    // If Time Runs Out & Answer is Not Clicked
                    } else {
                        i--;
                        // Hides Timer
                        $('#timer').hide();
                        // Reset Timer
                        sec = '03';
                        // Sets Variable to True for Question Function
                        answerClick = true;
                        // Calls Question Function
                        showQuestions(questions,quizContainer);
                        // Troubleshoot to Console
                        console.log('Wrong');
                        console.log(i);
                        // Display Result to HTML
                        quizContainer.innerHTML = '<p id="over">Wrong! <br>Correct Answer:<br>' + questions[i].correctAnswer + ') ' + questions[i].text + '<br>' + numCorrect + ' out of ' + questions.length + '</p>';
                    };
            }, 1000);
        }

    // Grabs Element from HTML for Functions
    var quizContainer = document.getElementById('quiz');

    // Calls the Quiz Function
    generateQuiz(myQuestions, quizContainer);
    });
});
