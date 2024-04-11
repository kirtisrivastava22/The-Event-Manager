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
    return special.test(str);
 }
 
 function hasnumber(str) {
    let special = "0123456789";
    return special.test(str);
 }
function validateForm(){
  var returnval= true;
  clearErrors();
  var email=document.forms['loginform']['email'].value;
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
  var pass=document.forms['loginform']['password'].value;
  if(pass.length<5){
    seterror("password","Password should be atleast 5 characters long");
    returnval=false;
  }
  return returnval;
}