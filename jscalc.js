var result = 0;
var resultText = document.getElementById("result"); //main #s shown
var eqText = document.getElementById("equation") //the equation down below
var numbers = document.getElementsByClassName("num");
var exec = document.getElementsByClassName("exec");
var neg = document.getElementById("neg");
var negSwitch = 0; //used for switching b/t pos(0) & neg(-1) numbers
var switchNum = 1; //differentiates b/t num1 & num2 for purpose of using +/-
var dec = document.getElementById("dec");
var execFunc = ""; //the chosen operator
var num1 = [];
var num2 = [];
var equals = document.getElementById("equals");
var allClear = document.getElementById("allClear");
var clrEntry = document.getElementById("clrEntry");

//clear all on calc
allClear.addEventListener("click", function(){
	execFunc = "";
	num1 = [];
	num2 = [];
	result = 0;
	resultText.textContent = 0;
	eqText.textContent = 0
	dec.style.pointerEvents = "auto";
	for(i = 0; i < numbers.length; i++){
		numbers[i].style.pointerEvents = "auto";
	} //in case previous length of num1 or num2 === 10
})

//clear entry
clrEntry.addEventListener("click", function(){
	//if operation has not been chosen (no num2, num1 array not yet joined)
	if(num1.length > 0){
		num1 = [];
		result = 0;
		resultText.textContent = 0;
		eqText.textContent = 0;
	}
	//if operation has been chosen, but num2 array not yet joined
	if(num1.length == null){
		num2 = [];
		execFunc = "";
		neg.style.pointerEvents = "none" //because no operator is chosen yet
		resultText.textContent = num1;
		eqText.textContent = num1
	}
	dec.style.pointerEvents = "auto";
})

//each number key press
for(i = 0; i < numbers.length; i++){
	numbers[i].addEventListener("click", function(){
		if(execFunc === ""){
			num1.push(this.value);
			resultText.textContent = num1.join("");
			eqText.textContent = num1.join("");
			if(num1.length === 10){
				for(i = 0; i < numbers.length; i++){
					numbers[i].style.pointerEvents = "none";
				}
			}
		}else{
			num2.push(this.value);
			resultText.textContent = num2.join("");
			eqText.textContent = num1.toString().substring(0,10) + " " + execFunc + " " + num2.join("");
			if(num2.length === 10){
				for(i = 0; i < numbers.length; i++){
					numbers[i].style.pointerEvents = "none";
				}
			}
		}
	})
}


//selecting an operator 
for(i = 0; i < exec.length; i++){
	exec[i].addEventListener("click", function(){
		if(num1.length > 0){
			num1 = Number(num1.join(""));
		}else if(num1.length === 0){
			num1 = 0;
		}
		if(num2.length > 0){
			num2 = Number(num2.join(""));
			operator();
		}
		execFunc = this.value;
		switchNum = 2;
		eqText.textContent = num1.toString().substring(0,10) + " " + execFunc;
		neg.style.pointerEvents = "auto"; //in case C/E was pressed beforehand
		for(i = 0; i < numbers.length; i++){
			numbers[i].style.pointerEvents = "auto";
		}
	})
}

//'equals' num2 is joined and operator function runs
equals.addEventListener("click", function(){
	if(num1.length > 0){
		return;
	}
	if(num2.length > 0){
		num2 = Number(num2.join(""));
	}
	operator();
	switchNum = 1;
	execFunc = "";
})

//switch statements performs equation based on chosen operator
function operator(){
	switch(execFunc){
		case "+":
			result = Number(num1) + Number(num2);
			break;
		case "-":
			result = Number(num1) - Number(num2);
			break;
		case "x":
			result = num1 * num2;
			break;
		case "/":
			result = num1 / num2;
			break;
		default:
			break;
	}
	if(result > 999999999){
		result = "Data Limit";
	}
	//convert # to string (only in displayed text) to limit # of characters
	resultText.textContent = result.toString().substring(0,10);
	eqText.textContent = result.toString().substring(0,10);
	num1 = result;
	num2 = [];
}

//disable decimal btn after click; re-enable after operator is chosen
dec.addEventListener("click", function(){
	dec.style.pointerEvents = "none";
})

for(i = 0; i < exec.length; i++){
	exec[i].addEventListener("click", function(){
		dec.style.pointerEvents = "auto";
	})
}

//negative number
neg.addEventListener("click", function(){
	negPos();
})

//allows user to switch current # from pos. to neg. seamlessly
//if switchNum = 1, num1 is being manipulated; if switchNum = 2, then num2
//negSwitch assigned a value denoting positive(0) or negative(-1) value
function negPos(){
	switch(switchNum){
		//num1 being manipulated
		case 1:
			if(negSwitch === 0){
				negSwitch--; //negSwitch will equal -1
				num1.splice(0, 0, "-");
				resultText.textContent = num1.join("");
				eqText.textContent = num1.join("");
			}else{
				negSwitch++; //negSwitch will equal 0
				num1.shift();
				if(num1.length > 0){
					resultText.textContent = num1.join("");
					eqText.textContent = num1.join("");
				}else{
					resultText.textContent = 0;
					eqText.textContent = 0;
				}
			}
			break;
		case 2:
			if(negSwitch === 0){
				negSwitch--;
				num2.splice(0, 0, "-");
				resultText.textContent = num2.join("");
				eqText.textContent = num1 + " " + execFunc + " " + num2.join("");
			}else{
				negSwitch++;
				num2.shift();
				if(num2.length > 0){
					resultText.textContent = num2.join("");
					eqText.textContent = num1 + " " + execFunc;
				}else{
					resultText.textContent = num1;
					eqText.textContent = num1 + " " + execFunc;
				}
			}
			break;
	}
}
