var baseUrl = "http://localhost:8080"
var popup = document.querySelector(".popup");
var close = document.querySelector(".close");

close.addEventListener("click", () => {
    popup.style.display = "none";
});

var modalBtn = document.querySelector(".modal-btn");
var modalBg = document.querySelector(".modal-bg");
var modalCl = document.querySelector(".modal-close");

modalBtn.addEventListener("click", function () {
    modalBg.classList.add("bg-active");
});

modalCl.addEventListener("click", function () {
    modalBg.classList.remove("bg-active");
});

var modalBtn1 = document.querySelector(".modal-btn1");
var modalBg1 = document.querySelector(".modal-bg1");
var modalCl1 = document.querySelector(".modal-close1");

modalBtn1.addEventListener("click", function () {
    modalBg1.classList.add("bg-active1");
});

modalCl1.addEventListener("click", function () {
    modalBg1.classList.remove("bg-active1");
});


// Register as new user Signup
document.querySelector(".next").addEventListener("click", signUp);

function signUp() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email1").value;
    var pass = document.getElementById("pass1").value;

    var userProfile = {
        name: name,
        email: email,
        password: pass,
    };

    fetch(`${baseUrl}/users/register`,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(userProfile)
    }).then(res=>res.json())
    .then((res)=>{
        if(res.msg=="Already registered"){

        }
        else{

        }

    })
}


// login as user
document.querySelector(".signInn").addEventListener("click", signIn);

var user;

async function signIn() {
    var email = document.querySelector("#email").value;
    var pass = document.querySelector("#pass").value;

   
}




// for (var i = 0; i < regdUsers.length; i++) {
//     if (regdUsers[i].emailAddress == email && regdUsers[i].password == pass) {
//         alert("Login Successfully!");
//         window.location.href = "index.html";
//         return true;
//     }
// }
// for (var j = 0; j < regdUsers.length; j++) {
//     if (regdUsers[j].emailAddress != email && regdUsers[j].password != pass) {
//         alert("Invalid User Credentials!");
//         window.location.href = "index.html";
//         return true;
//     }
// }