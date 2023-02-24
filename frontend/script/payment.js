let placeorder=document.getElementById("placeorder")
  
placeorder.addEventListener("click",()=>{
let fname=document.getElementById("fname").value
let email=document.getElementById("email").value
let adr=document.getElementById("adr").value
let city=document.getElementById("city").value


if(fname=="" || email==""|| adr==""|| city==""){
    alert("Please fill all the details")
}else{
    let obj={
        fname,email,adr,city
    }
   
        alert("order placed")
            window.location.href="index.html"
   
}
})