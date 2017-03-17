/*

   Author:   Cameron Pickle
   Date:     7/18/16

   Filename: report.js



   Functions List:

   initPage()
      Initializes the contents of the Web page

   testLength()
      Tests a field for its length

   testPattern()
      Tests a field for its pattern

   validateForm
      Validates a Web form

   calcRow
      Calculates the costs within one row of the travel report

   calcTotal
      Calculates the total cost of the travel

   upDate
      Updates the total travel cost
*/
//When pages loads call the initPage method
window.onload = initPage;

function initPage() {
  var dataFields = document.getElementsByClassName("expenseEntry"); //fill dataFields with the expense input elements
	
	for(var i=0; i<dataFields.length; i++){
	  dataFields[i] = document.getElementsByClassName("expenseEntry")[i];
		dataFields[i].addEventListener("blur", update); //add onblur event listeners to expense entry datafields
	}
	
	document.forms[0].onsubmit = validateForm; //validate form before submition
}

function testLength(field) {
  if(field.value.length == 0) { //if the feild has no length don't accept it and highlight the field yellow
	  field.style.backgroundColor = "yellow";
		return false;
	} else { //otherwise accept the value
	  field.style.backgroundColor = "white";
		return true;
	}
}

function testPattern(field, regx) {
  if(regx.test(field.value)) { //compare the regex to the field value if true accept it
	  field.style.backgroundColor = "white";
		field.style.color = "black";
		return true;
	} else { //if it doesn't match regex highlight it yellow and change the font to red and don't accept it
	  field.style.backgroundColor = "yellow";
		field.style.color = "red";
		return false;
	}
}

function validateForm() {
  var isValid = true;
	//Run for through list of validations (length and regex's)
  isValid = (testLength(document.forms[0].lname))? isValid:false;
  isValid = (testLength(document.forms[0].fname))? isValid:false;
  isValid = (testLength(document.forms[0].address))? isValid:false;
  isValid = (testLength(document.forms[0].summary))? isValid:false;
	isValid = (testPattern(document.forms[0].account, /^ACT\d{6}$/))? isValid:false;
	isValid = (testPattern(document.forms[0].department, /^DEPT\d{3}$/))? isValid:false;
	isValid = (testPattern(document.forms[0].project, /^PROJ\d{5}$/))? isValid:false;
	isValid = (testPattern(document.forms[0].ssn, /^\d{9}|(\d{3}-\d{2}-\d{4})$/))? isValid:false;
	if(!isValid) {
		  window.alert("Please fill out all required fields in the proper format."); //if any don't match don't submit form and notify user 
		}
	return isValid;
}

function calcRow(row) {
  //collect travel, lodge, and meal values for row
  var travel = parseFloat(document.forms[0].elements["travel"+row].value);
  var lodge = parseFloat(document.forms[0].elements["lodge"+row].value);
	var meal = parseFloat(document.forms[0].elements["meal"+row].value);
	
	return travel+lodge+meal;//return sum of values
}

function calcTotal() {
  var totalExp = 0;
	
	for(var i=1; i<5; i++) {
	  totalExp += calcRow(i); //sums the totals of the expense rows
	}
	
	return totalExp;
}

function update() {
  var numRegExp = /^\d*(\.\d{0,2})?$/; //regex to see if it is a number with no more than two decimal places
	
	if(numRegExp.test(this.value)) {//if value matches regex make sure it has two decimal places and update the grand total
		this.value = parseFloat(this.value).toFixed(2);
		for(var i=1; i<5; i++) {
		  document.forms[0].elements["sub"+i].value = calcRow(i).toFixed(2);
		}
		document.forms[0].total.value = parseFloat(calcTotal()).toFixed(2);
	} else { //if the value doesn't match the regex create an alert window to notify the user the value is invalid
	  window.alert("Invalid currency value");
		this.value = 0.00;
		this.focus();
	}
}