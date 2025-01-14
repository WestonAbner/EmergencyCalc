var xarr=[];
var yarr=[];
var carr=[];
var scaley =20;
var gline=true;
carr.push("red");


function setup() { 
	let c =createCanvas(400, 400);
	strokeWeight(1);
	background(220)
	  
  } 

  function draw(arrx, arry,gline,scale,color) { 	
	  if(gline==true){
      stroke(0);
	for(var i=0; i<height; i+=scale){
		line(0, i, width, i);
	}
	for(var j=0; j<height; j+=scale){
		line(j, 0, j, height);
	}
}
	for(i = 0;i < arrx.length;i++){
		noFill();
		strokeWeight(1);
		stroke(color)
		beginShape();
		for(j=0; j<arrx[i].length;j++){
			curveVertex(arrx[i][j],arry[i][j]);

		}
		endShape();
		  
	}
	
	//saveCanvas(c,'mycanvas', 'jpg')
	//saveCanvas(c,'mycanvas', 'png')
  }  


//////////////////////////
//////////////////////////
//////////////////////////

function calcbutton(eq){
    var result =calculate(eq)
    return result;
}

function colorchoice(color){
    carr.push(color);
}

function dscale(){
    scaley= scaley -2;
    return scaley;

  }
  
  function iscale(){
    scaley= scaley +2;
    return scaley;

  }
  function graph(){
      var p = document.getElementById("graphfunc1").value;
      var temp =graphpoints(p,scaley);
      console.log(scaley);
      xarr.push(temp[0])
      yarr.push(temp[1])
      draw(xarr,yarr,gline,scaley,carr);
    }

  ///////////////////////////////////
  ///////////////////////////////////
  ///////////////////////////////////

const lexer = (function() {
  function tokenize(input) {
    const chars = input.split("");
    const tokens = [];

    while (chars.length) {
  
      readWhile(chars, isWhitespace);

      if (!chars.length) {
        break;
      }

      const ch = chars.shift();

      if (isNum(ch)) {
        tokens.push({ type: "NUM", val: ch + readWhile(chars, isNum) });
      } else if (isOp(ch)) {
        tokens.push({ type: "OP", val: ch });
      }
      else if (isvar(ch)) {
        tokens.push({ type: "NUM", val: ch });
      }
      else if (islet(ch)) {
        tokens.push({ type: "OP", val: ch + readWhile(chars, islet) });
      }
    }

    return infixToReversePolish(tokens);
  }

  function readWhile(chars, predicate) {
    let str = "";

    while (chars.length && predicate(chars[0])) {
      str += chars.shift();
    }

    return str;
  }

  function isWhitespace(ch) {
    return /[\n\t\s]/.test(ch);
  }

  function isNum(ch) {
    return /[0-9.]/.test(ch);
  }

  function islet(ch) {
    return /[a-z]/.test(ch);
  }
  function isvar(ch) {
    return /[xπe]/.test(ch);
  }

  function isOp(ch) {
    return /[√()\-+\/*^%]/.test(ch);
  }

  return { tokenize };
})();

function infixToReversePolish(tokens) {
  const queue = [];
  const stack = [];
  const precedence = {
    "(": 10,
    "+": 20, "-": 20,
    "/": 30, "*": 30, "%": 30,
    "^": 40, 
    "sqrt": 50, "tan": 50, "cos":50, "sin": 50,  "ln": 50, "log": 50, "√":50,
    
  };

  while (tokens.length) {
    const token = tokens.shift();
    const tkPrec = precedence[token.val] || 0;
    let stPrec = stack.length ? precedence[stack[stack.length - 1].val] : 0;

    if (token.type == "OP" && token.val == ")") {
      let op = null;

      while ((op = stack.pop()).val != "(") {
        queue.push(op);
      }
    } else if (token.type == "NUM") {
      queue.push(token);
    } else if (token.type == "OP" && (!stack.length || token.val == "(" || tkPrec > stPrec)) {
      stack.push(token);
    } else {
      while (tkPrec <= stPrec) {
        queue.push(stack.pop());
        stPrec = stack.length ? precedence[stack[stack.length - 1].val] : 0;
      }

      stack.push(token);
    }
  }

  while (stack.length) {
    queue.push(stack.pop());
  }

  return queue;
}

function evaluate(tokens) {
  let stack = [];
  let rhs=0;
  let lhs=0;

  while (tokens.length) {
    const token = tokens.shift();
    if (token.type == "NUM" && token.val == "π") {
     
      stack.push(Math.PI);
      continue;
    }
    else if (token.type == "NUM" && token.val == "e") {
     
      stack.push(Math.E);
      continue;
    }

    else if (token.type == "NUM") {
     
      stack.push(parseFloat(token.val));
      continue;
    }
    if(token.val =="tan"|| token.val == "cos"||token.val == "sin"|| token.val == "sqrt" ||token.val == "√" ||token.val == "ln"||token.val == "log"){
      rhs = stack.pop();
    }
    else {
      rhs = stack.pop(); 
      lhs = stack.pop();
    }

    switch (token.val) {
      case "+": stack.push(lhs + rhs); break;
      case "-": stack.push(lhs - rhs); break;
      case "*": stack.push(lhs * rhs); break;
      case "/": console.log(rhs); stack.push(lhs / rhs); break;
      case "%": stack.push(lhs % rhs); break;
      case "^": stack.push(Math.pow(lhs, rhs)); break;
      case "tan": stack.push(Math.tan(rhs * Math.PI / 180)); break;
      case "sin": stack.push(Math.sin(rhs * Math.PI / 180)); break;
      case "cos": stack.push(Math.cos(rhs * Math.PI / 180)); break;
      case "sqrt": stack.push(Math.sqrt(rhs)); break;
      case "√": stack.push(Math.sqrt(rhs)); break;
      case "ln": stack.push(Math.log(rhs)); break;
      case "log": stack.push(Math.log(rhs)/Math.log(10)); break;
    }
  }

  return stack.pop();
}

function calculate(expr){
  const tokens = lexer.tokenize(expr);
  const answer = evaluate(tokens);
  return answer;
}


function evaluateg(tokens, v) {
  var stack = [];
  var rhs=0;
  var lhs=0;

  while (tokens.length) {
    const token = tokens.shift();
    if (token.type == "NUM" && token.val == "π") {
     
      stack.push(Math.PI);
      continue;
    }
    else if (token.type == "NUM" && token.val == "e") {
     
      stack.push(Math.E);
      continue;
    }
    else if (token.type == "NUM" && token.val == "x") {
     
      stack.push(v);
      continue;
    }

    else if (token.type == "NUM") {
     
      stack.push(parseFloat(token.val));
      continue;
    }
    if(token.val =="tan"|| token.val == "cos"||token.val == "sin"|| token.val == "sqrt" ||token.val == "√" ||token.val == "ln"||token.val == "log"){
      rhs = stack.pop();
    }
    else {
      rhs = stack.pop(); 
      lhs = stack.pop();
    }

    switch (token.val) {
      case "+": stack.push(lhs + rhs); break;
      case "-": stack.push(lhs - rhs); break;
      case "*": stack.push(lhs * rhs); break;
      case "/": stack.push(lhs / rhs); break;
      case "%": stack.push(lhs % rhs); break;
      case "^": stack.push(Math.pow(lhs, rhs)); break;
      case "tan": stack.push(Math.tan(rhs * Math.PI / 180)); break;
      case "sin": stack.push(Math.sin(rhs * Math.PI / 180)); break;
      case "cos": stack.push(Math.cos(rhs * Math.PI / 180)); break;
      case "sqrt": stack.push(Math.sqrt(rhs)); break;
      case "√": stack.push(Math.sqrt(rhs)); break;
      case "ln": stack.push(Math.log(rhs)); break;
      case "log": stack.push(Math.log(rhs)/Math.log(10)); break;
    }
  }

  return stack.pop();
}

function calculateg(expr, v){
  const tokens = lexer.tokenize(expr);
  const answer = evaluateg(tokens,v); 
  return answer;
}

  
function graphpoints(eq,scale){
let x=0;
let y=0; 
let arrx=[];
let arry=[];
let values= [];
let limit = scale/2;
let i = -limit;
let gscale= 400/scale;
for(i;i <= scale; i++){
  x=i;
  y= calculateg(eq, i);
  x= 200 + x*gscale;
  y= 200 + -y*gscale;
  arrx.push(x);
  arry.push(y);
}
values.push(arrx)
values.push(arry)
return values;
}


/////////////////////////////
/////////////////////////////
/////////////////////////////



function openLogin() {
    location.href = ("http://desktop-0cbjv6o:3000/login");
}

function openRegister(){
    location.href = ("http://desktop-0cbjv6o:3000/register");
}

function openCalc(){
  location.href = ("http://desktop-0cbjv6o:3000/loadcalc");
}

function logout(){
    location.href = ("http://desktop-0cbjv6o:3000/logout");
}
function returnHome(){
  location.href = ("http://desktop-0cbjv6o:3000/");
}
function saveImage(){
  alert("p5 implementation of graph save")
}

function openNav() {
  document.getElementById("mySidebar").style.width = "500px";
  document.getElementById("main").style.marginLeft = "500px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}


function clearScreen() {
    document.getElementById("result").value = "";
   }
   

   function display(value) {
    document.getElementById("result").value += value;
   }

   function calculationFunc() {
    var p = document.getElementById("result").value;
    var q = calcbutton(p);
    document.getElementById("result").value = q;
   }

   function highlight_row() {
    var table = document.getElementById('display-table');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        
        var cell = cells[i];
        
        cell.onclick = function () {
            
            var rowId = this.parentNode.rowIndex;

            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "#64278f";
            rowSelected.className += " selected";

            calculation = rowSelected.cells[1].innerHTML;
            graphfunction = rowSelected.cells[2].innerHTML;

            localStorage.setItem("calc", rowSelected.cells[1].innerHTML);
            localStorage.setItem("graph",rowSelected.cells[2].innerHTML);
        }
    }
}
function importData(){
alert("Calculation: " + localStorage.getItem("calc") + "Graph Function: "+ localStorage.getItem("graph"));
}
function returnCalc(){
  return localStorage.getItem("calc");
}

function moveCalc() {  
  document.getElementById("result").value=localStorage.getItem("calc"); 
  } 

  function moveGraphFunc(){
    document.getElementById("graphfunc1").value = localStorage.getItem("graph");
  }