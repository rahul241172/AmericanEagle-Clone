var baseUrl = "http://localhost:8080"
let paginationWrapper = document.getElementById("pagination-wrapper")
// Dropdown Filter menubar
var dropdown = document.getElementsByClassName("dropdown-btn");

for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}


// Products Display 
let dataListWrapper = document.querySelector(".data-list-wrapper");
var arr;
Fetching()

async function Fetching(queryParamString = null) {
    try {
        let res = await fetch(`${baseUrl}/products/mens${queryParamString ? queryParamString : ""}`);
        var data = await res.json();
        arr = data
        let count = data.length
        console.log(count)
        let totalPages = Math.ceil(count / 15)
        renderPagination(totalPages);
        var new_arr = arr.slice(0, 15)
        getData(new_arr)
    }
    catch (error) {
        console.log(error);
    }
}
function getData(data) {
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
      <div class="card-list">
          ${data
            .map((item) => {
                let id = item._id
                let image = item.image;
                let name = item.name;
                let price = item.price;
                let type = item.type;
                let category = item.category;
                return getAsCard(id, image, name, price, type, category);
            })
            .join("")}
      </div>
  `;
  addtocart()
}


function getAsCard(id, image, name, price, type, category) {
    return `
        <div class="card-wrapper">
        <div class="imagediv">
        <img id="product-image" src="${image}" alt="image">
        </div>
        <br>
        <div class="title">
        <span id="product-name">${name}</span>
        <p id="product-price" class="price">${price}</p>
           </div>
          <div class="list-buttons">
          <button class="add-data" data-id="${id}">Add to Cart</button>
          </div>
        </div>
    `;
}

// pagination 

function renderPagination(numOfPages) {

    function asListOfButtons() {
        let arr = [];
        for (let i = 1; i <= numOfPages; i++) {
            arr.push(getAsButton(i));
        }
        // console.log(arr)
        return arr.join('');
    }

    paginationWrapper.innerHTML = `
      <div>  
        ${asListOfButtons()}  
        <span>> > </span>
      </div>
    `

    let paginationButtons = document.querySelectorAll(".pagination-button");
    for (let btn of paginationButtons) {
        btn.addEventListener('click', (e) => {
            let dataId = e.target.dataset.id;
            var newarr = arr.slice((dataId - 1) * 15, 15 * dataId)
            btn.style="color:blue"
            getData(newarr);
        })
    }
}



function getAsButton(pageNumber) {
    return `<button class="pagination-button" data-id=${pageNumber}>${pageNumber}</button>`
}



// sorting

let sort=document.getElementById("sel")

sel.addEventListener("change",()=>{
    if(sel.value==""){
        let count=arr.length
let totalPages = Math.ceil(count / 15)
renderPagination(totalPages);
let new_arr = arr.slice(0, 15)
getData(new_arr)
    }
    else if(sel.value=="low"){
let newarr=[...arr]
newarr.sort((a,b)=>{
    return a.price - b.price
})
let count=newarr.length
let totalPages = Math.ceil(count / 15)
renderPagination(totalPages);
let new_arr = newarr.slice(0, 15)
getData(new_arr)
    }
    else if(sel.value=="high"){
        let newarr=[...arr]
        newarr.sort((a,b)=>{
            return b.price - a.price
        })
        let count=newarr.length
        let totalPages = Math.ceil(count / 15)
        renderPagination(totalPages);
        let new_arr = newarr.slice(0, 15)
        getData(new_arr)
    }
})


// mens jeans filter

let mensjeans=document.getElementById("mens-jeans")
let menstshirt=document.getElementById("mens-tshirt")
mensjeans.addEventListener("click",()=>{
    let newarr=arr.filter((item)=>{
        return item.type=="jeans"
    })
    getData(newarr)
    sel.addEventListener("change",()=>{
        if(sel.value==""){
    getData(newarr)
        }
        else if(sel.value=="low"){
    let fiterarr=[...newarr]
    fiterarr.sort((a,b)=>{
        return a.price - b.price
    })
    getData(fiterarr)
        }
        else if(sel.value=="high"){
            let fiterarr=[...newarr]
    fiterarr.sort((a,b)=>{
        return b.price - a.price
    })
    getData(fiterarr)
        }
    })
})


// mens tshirt filter
menstshirt.addEventListener("click",()=>{
    let newarr=arr.filter((item)=>{
        return item.type=="tshirt"
    })
    getData(newarr)
    sel.addEventListener("change",()=>{
        if(sel.value==""){
    getData(newarr)
        }
        else if(sel.value=="low"){
    let fiterarr=[...newarr]
    fiterarr.sort((a,b)=>{
        return a.price - b.price
    })
    getData(fiterarr)
        }
        else if(sel.value=="high"){
            let fiterarr=[...newarr]
    fiterarr.sort((a,b)=>{
        return b.price - a.price
    })
    getData(fiterarr)
        }
    })
})


//  search functionality

let searchbutton=document.getElementById("search-button")

searchbutton.addEventListener("click",()=>{
    let searchvalue=document.getElementById("search-value").value
    if(searchvalue=="me" || searchvalue=="mens" ||searchvalue=="womens" || searchvalue=="wo"){
search()
    async function search() {
        try {
            let res = await fetch(`${baseUrl}/products?category=${searchvalue}`);
            let data = await res.json();
            let count = data.length
        getData(data)
        }
        catch (error) {
            console.log(error);
        }
    }
}
    else{
        search()
    async function search() {
        try {
            let res = await fetch(`${baseUrl}/products?type=${searchvalue}`);
            let data = await res.json();
            let count = data.length
        getData(data)
        }
        catch (error) {
            console.log(error);
        }
    }
    }
    
})


// To get userdata on navbar

let user_data=JSON.parse(localStorage.getItem("user"))||[]
let token=localStorage.getItem("token")
let user_name=document.getElementById("user")
let logout=document.getElementById("logout")

if(user_data.length>0){
user_name.innerHTML=user_data[0].name
logout.innerHTML="Logout"
}


// Add to cart
function addtocart(){
let cartbtn=document.querySelectorAll(`.add-data`)
for(let cart of cartbtn){
    cart.addEventListener("click",(e)=>{
let dataid=e.target.dataset.id
let obj={}
arr.forEach(element => {
    if(dataid==element._id){
        obj.name=element.name
        obj.image=element.image
        obj.price=element.price
        obj.dataid=dataid
        obj.quantity=1
    }
});
console.log(obj)
    if (token){
        fetch(`${baseUrl}/cart/add`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify(obj)
        }).then(res=>res.json())
        .then((res)=>{
                if(res.msg=="Product Added sucessfully"){
                alert("Added to cart")
                }
                else{
                    alert("Already in cart")
                }
    })
}
else{
    alert("please login first")
}
})
}
}
