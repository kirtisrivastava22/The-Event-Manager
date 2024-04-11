
function seterror(id ,error){
    //sets error inside tag of id
    element=document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML=error;

}
function clearErrors(){
  errors=document.getElementsByClassName('formerror');
  for(let item of errors){
    item.innerHTML="";
  }
}

function hasSpecialChar(str) {
    let special = "/[@!#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]/";
    if(str.match(special)){
    return true;
    } else {
    return false;
    }
 }
 
 const hasNumbers = (str) => {
    if (str.match(/\d+/g) !== null) {
      return true;
    } else {
      return false;
    }
  };

function validateSignupForm(){
  var returnval= true;
  clearErrors();
  var email=document.forms['signupform']['email'].value;
  var spass=document.forms['signupform']['password'].value;
  var cspass=document.forms['signupform']['cpassword'].value;
  var name=document.forms['signupform']['username'].value;

  if(email.substr(email.length-10) !="@gmail.com"){
    seterror("email","Not a valid email");
    returnval= false;
  }
  if(email.length<10){
    seterror("email","Not a valid email");
    returnval=false;
  }
  if(email.length>30){
    seterror("email","Too long email");
    returnval=false;
  }
  if(name.length<6){
    seterror("username","Too short username");
    returnval=false;
  }
  if(spass.length<5){
    seterror("password","Password should be atleast 5 characters long");
    returnval=false;
  }
  if(!hasNumbers(spass)){
    seterror("password","Password should contain atleast 1 digit");
    returnval=false;
  }
  if (!hasSpecialChar(spass)) {
    seterror("password","Password should contain atleast 1 special character");
    returnval=false;
  }
    
  if(cspass!=spass){
    seterror("cpassword","Password not matching with above password given");
    returnval=false;
  }
  
  console.log(returnval);
  return returnval;
}