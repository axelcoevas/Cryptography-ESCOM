var p = document.getElementById("numberP");
var q = document.getElementById("numberQ");
var n = document.getElementById("numberN");
var p_1 = document.getElementById("numberP_1");
var q_1 = document.getElementById("numberQ_1");
var phi = document.getElementById("phi");
var d = document.getElementById("d");
var e = document.getElementById("e");

function getCoefficients() {
  let p_value = p.value;
  let q_value = q.value;

  //Asignando los valores respectivos
  n.value = p_value*q_value; // p * q
  p_1.value = p_value - 1; // p-1
  q_1.value = q_value - 1; // q-1
  phi.value = p_1.value * q_1.value; // (p-1)*(q-1)
}

function getKeys() {
  let phi_value = phi.value;
  let e_value = e.value;

  for(var i = 1; i<phi_value ; i++){
    if((i*e_value)%phi_value == 1){
      d.value = i;
      return;
    }
  }
}

function validate(element, validation){
  let number = element.value;
  if(!validation(number) || number===0){
    element.classList.add("is-invalid");
  }else{
    element.classList.remove("is-invalid");
  }
}

function isPrime(number){
  for (var i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return number != 1;
}

function isCoprime(number) {
  let pLess1 = p_1.value;
  let qLess1 = q_1.value;

  return number%pLess1 !== 0 && number%qLess1 !== 0;
}

function getPrivate(){
  let phi_value = phi.value;
  let e_value = e.value;

  
}



