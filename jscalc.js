var result = 0;
var resultText = document.getElementById("result");
var eqText = document.getElementById("equation")
var numbers = document.getElementsByClassName("num");
var exec = document.getElementsByClassName("exec");
var execFunc = "";
var num1 = [];
var num2 = [];
var equals = document.getElementById("equals");
var allClear = document.getElementById("allClear");
var clrEntry = document.getElementById("clrEntry");

allClear.addEventListener("click", function(){
	execFunc = "";
	num1 = [];
	num2 = [];
	result = 0;
	resultText.textContent = 0;
	eqText.textContent = 0
	console.log("cleared " + num1 + " " + num2);
})

clrEntry.addEventListener("click", function(){
	execFunc = "";
	if(num2.length === 0){
		num1 = [];
		result = 0;
		resultText.textContent = 0;
	}
	num2 = [];
	resultText.textContent = num1;
	console.log("cleared entry");
})

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
			eqText.textContent = num1 + " " + execFunc + " " + num2;
			console.log(num2);
		}
	})
}

for(i = 0; i < exec.length; i++){
	exec[i].addEventListener("click", function(){
		execFunc = this.value;
		console.log(this.value);
		if(num1.length > 0){
			num1 = Number(num1.join(""));
			//eqText.textContent = num1 + " " + execFunc;
			console.log(num1);
		}else if(num1.length == null){
			//eqText.textContent = num1 + " " + execFunc;
			console.log(num1);
		}
		if(num2.length > 0){
			num2 = Number(num2.join(""));
			operator();
		}
		eqText.textContent = num1 + " " + execFunc;
	})
}

equals.addEventListener("click", function(){
	if(num2.length > 0){
		num2 = Number(num2.join(""));
		console.log(num2);
	}
	operator();
})

function operator(){
	switch(execFunc){
		case "+":
			console.log(num1 + num2);
			result = Number(num1) + Number(num2);
			resultText.textContent = result;
			eqText.textContent = result;
			break;
		case "-":
			console.log(num1 - num2);
			result = Number(num1) - Number(num2);
			resultText.textContent = result;
			eqText.textContent = result;
			break;
		case "x":
			console.log(num1 * num2);
			result = num1 * num2;
			resultText.textContent = result;
			eqText.textContent = result;
			break;
		case "/":
			console.log(num1 / num2);
			result = num1 / num2;
			resultText.textContent = result;
			eqText.textContent = result;
			break;
		default:
			break;
	}
	num1 = result;
	num2 = [];
}




