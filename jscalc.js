var result = 0;
var resultText = document.getElementById("result"); //main #s shown
var eqText = document.getElementById("equation") //the equation down below
var numbers = document.getElementsByClassName("num");
var exec = document.getElementsByClassName("exec");
var neg = document.getElementById("neg");
var negSwitch = 0; //used for switching b/t pos & neg numbers
var switchNum = 1; //differentiates b/t num1 & num2 when using +/-
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
	console.log("cleared " + num1 + " " + num2);
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
		resultText.textContent = num1;
		execFunc === "";
		eqText.textContent = num1
	}
	console.log("cleared entry");
})

//each number key press
for(i = 0; i < numbers.length; i++){
	numbers[i].addEventListener("click", function(){
		if(execFunc === ""){
			num1.push(this.value);
			resultText.textContent = num1.join("");
			eqText.textContent = num1.join("");
			console.log(num1);
		}else{
			num2.push(this.value);
			resultText.textContent = num2.join("");
			eqText.textContent = num1 + " " + execFunc + " " + num2.join("");
			console.log(num2);
		}
	})
}

//selecting an operator 
for(i = 0; i < exec.length; i++){
	exec[i].addEventListener("click", function(){
		execFunc = this.value;
		console.log(this.value);
		switchNum = 2;
		console.log("switchNum=" + switchNum);
		if(num1.length > 0){
			num1 = Number(num1.join(""));
			//switchNum++;
			//console.log("switchNum=" + switchNum);
			console.log(num1);
		}else if(num1.length === 0){
			num1 = 0;
			//switchNum++;
			//console.log("switchNum=" + switchNum);
			console.log(num1);
		}
		if(num2.length > 0){
			num2 = Number(num2.join(""));
			//switchNum--;
			//console.log("switchNu=" + switchNum);
			operator();
		}
		eqText.textContent = num1 + " " + execFunc;
	})
}

//'equals' num2 is joined and operator function runs
equals.addEventListener("click", function(){
	if(num1.length > 0){
		num1 = [];
		return;
	}
	if(num2.length > 0){
		num2 = Number(num2.join(""));
		console.log(num2);
	}
	operator();
	switchNum = 1;
})

//switch statements performs equation based on chosen operator
function operator(){
	switch(execFunc){
		case "+":
			console.log(num1 + num2);
			result = Number(num1) + Number(num2);
			break;
		case "-":
			console.log(num1 - num2);
			result = Number(num1) - Number(num2);
			break;
		case "x":
			console.log(num1 * num2);
			result = num1 * num2;
			break;
		case "/":
			console.log(num1 / num2);
			result = num1 / num2;
			break;
		default:
			break;
	}
	if(result > 999999999){
		result = "Data Limit";
	}
	resultText.textContent = result;
	eqText.textContent = result;
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
//negSwitch assigned a value denoting positive(0) or negative(1) value
function negPos(){
	console.log("switchNum=" + switchNum)
	switch(switchNum){
		//num1 being manipulated
		case 1:
			if(negSwitch === 0){
				negSwitch++; //negSwitch will equal 1
				console.log("negSwitch=" + negSwitch);
				num1.splice(0, 0, "-");
				resultText.textContent = num1.join("");
				eqText.textContent = num1.join("");
			}else{
				negSwitch--; //negSwitch will equal 0
				console.log("negSwitch=" + negSwitch);
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
				negSwitch++;
				console.log("negSwitch=" + negSwitch);
				num2.splice(0, 0, "-");
				resultText.textContent = num2.join("");
				eqText.textContent = num1 + " " + execFunc + " " + num2.join("");
			}else{
				negSwitch--;
				console.log("negSwitch=" + negSwitch);
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


