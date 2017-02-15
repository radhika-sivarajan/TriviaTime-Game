var correctCount = 0;
var inCorrectCount = 0;
var unAnsweredCount = 0;
var count = 0;
var sec = 0;
var showQuiz;
var timeShow;

//Question array
var quizList = [
	{	
		name: "question1",
		question: "1. What city is the capital of China?",
		answer: "Beijing",
		choices: ["Beijing","Tokyo","Manila"],
		image: "assets/images/beijing.jpg"
	},
	{
		name: "question2",
		question: "2. What is the largest lake in Africa?",
		answer: "Victoria",
		choices: ["Kivu","Chad","Victoria","Malwi"],
		image: "assets/images/victoria.gif"
	},
	{
		name: "question3",
		question: "3. Which ocean trench is the deepest?",
		answer: "Mariana",
		choices: ["Tonga","Kermadec","Mariana","Java"],
		image: "assets/images/mariana.jpg"
	},
	{
		name: "question4",
		question: "4. Canada's highest mountain is located in which province or territory?",
		answer: "Yukon",
		choices: ["Alberta","Quebec","Ontario","Yukon"],
		image: "assets/images/yukon.gif"
	},
	{
		name: "question5",
		question: "5. How many times zones are in Canada?",
		answer: "Six",
		choices: ["Five","Six","Seven","Eight"],
		image: "assets/images/canada.jpg"
	},
	{
		name: "question6",
		question: "6. What is the capital city of Australia?",
		answer: "Canberra",
		choices: ["Canberra","Columbus","Burma"],
		image: "assets/images/australia.jpg"
	},
	{
		name: "question7",
		question: "7. In what country would you find Mount Kilimanjaro?",
		answer: "Tanzania",
		choices: ["Tanzania","Zambia","Angola","Ethiopia"],
		image: "assets/images/tanzania.gif"
	},
	{
		name: "question8",
		question: "8. Which city is located both in Asia and Europe continent?",
		answer: "Istanbul",
		choices: ["Bursa","Ankara","Izmir","Istanbul"],
		image: "assets/images/istanbul.jpg"
	},
	{
		name: "question9",
		question: "9. Which is the largest desert in the world?",
		answer: "Sahara",
		choices: ["Thar","Gobi","Sahara","Namib"],
		image: "assets/images/sahara.png"
	},
	{
		name: "question10",
		question: "10. First US zoo was built in?",
		answer: "Philadelphia",
		choices: ["Philadelphia","Phoenix","Los-Angeles","San-Diego"],
		image: "assets/images/philadelphia.jpg"
	}
];


// Resetting variable values 
function restart(){
	correctCount = 0;
	inCorrectCount = 0;
	unAnsweredCount = 0;
	count = 0;
	sec=0;
	$('.results').hide();
	$("#restart").hide();
	startQuiz();
}

// Display the timer
function displayTime(){

	$(".time-left").html("Time left : " + sec++ + " seconds");
}


// Display all questions and set timer
function displayQuestion(){

	var multipleChoice = "";

	//Get mutiple choice for each question, set it's values according to the choices and set same name for each question to group them together.
	for(var j=0; j<quizList[count].choices.length; j++){
		multipleChoice += "<br><input name=" + quizList[count].name + " type='radio' value=" + quizList[count].choices[j] + ">&emsp;" + quizList[count].choices[j];  
	}

	// Append all questions along with its choices
	quiz = "<span class='question'>" + quizList[count].question + "</span>" + multipleChoice;

	// Append all question and its choices in the form and display it on screen
	$(".quiz-form").html(quiz);

	$('.form').show();
}

// Check the result and update couters
function checkResult(){
	var val = "";
	var ans = "";

	// Get the value of checked button and compare it with answer of the question. Update the counters accordingly.
	val = $("input[name='" + quizList[count].name + "']:checked").attr("value");
	ans = quizList[count].answer;

	if(val === ans){
		correctCount++;
	}

	// If unanswered OR incorrect answer display Correct answer with its image
	else if (val === undefined){
		unAnsweredCount++;
		$(".quiz-form").html("<div class='answer'><strong>Timeout</strong><hr>Answer is : " + ans + "<br><img src='" + quizList[count].image + "' class='ansImg'></div>");
	}
	else{
		inCorrectCount++;
		$(".quiz-form").html("<div class='answer'><strong>Incorrect</strong><hr>Answer is : " + ans + "<br><img src='" + quizList[count].image + "' class='ansImg'></div>");
	}
	// console.log("ans " + ans + " val " + val + " correctCount " + correctCount + " inCorrectCount " + inCorrectCount + " unAnsweredCount " + unAnsweredCount);

}

// Display result
function displayResult(correct, incorrect, unanswered){
	var totalQuiz = quizList.length;
	var displayMessage = "Your score out of " + totalQuiz + "<hr>Correct answers : " + correct + "<br> Incorrect answers : " + incorrect + "<br> Unanswered : " + unanswered;
	$(".score").html(displayMessage);
	$('.results').show();
	$('.map-image').show();	
	$('.form').hide();
}

function nextQuestion(){
	checkResult();
	count++;
	
	var showAns = setTimeout(displayQuestion, 1000 * 2);
	sec=0;

	if (count === quizList.length) {
		clearInterval(showQuiz);
		clearInterval(showAns);
    	displayResult(correctCount, inCorrectCount, unAnsweredCount);
    	$("#restart").show();
  	}  		
}

function startQuiz(){
	$('.map-image').hide();	
	$('#start').hide();


	displayQuestion();	
	showQuiz = setInterval(nextQuestion, 1000 * 5);
	// timeShow = setInterval(setInterval(displayTime, 1000), 1000 * 7);
}

$(document).ready(function() {

	// When click on start button
	$("#start").click(startQuiz);

	// When click on restart button
	$("#restart").click(restart);

});
