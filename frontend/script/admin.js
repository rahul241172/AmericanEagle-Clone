let baseUrl = "https://blue-coypu-gear.cyclic.app"

// show user details -------------------------------------------------------
let token=localStorage.getItem("token")
let dataListWrapper = document.querySelector(".data-list-wrapper");
let showUsersButton = document.querySelector(".show-user-details");
showUsersButton.addEventListener("click", async function () {
    try {
        let res = await fetch(`${baseUrl}/users`,{
            method:"GET",
            headers:{
                "Authorization":token
            }
        });
        let data = await res.json();
        dispaly_data(data)
        let length=document.getElementById("data-length")
        length.innerText=`Total:${data.length}`
    } catch (error) {
        console.log(error)
    }
});

function dispaly_data(data) {
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
      <div class="card-list">
          ${data
            .map((item) => {
                let id = item._id;
                let username = item.name;
                let email = item.email;
                return userCard(id, username, email);
            })
            .join("")}
      </div>
  `;
  let deletingData = document.querySelectorAll(".delete-user");
  for (let deleteButton of deletingData) {
      deleteButton.addEventListener("click", function (element) {
          let data = element.target.dataset.id;
          deleteuser(data)
      })
  }

}

async function deleteuser(data){
    try {

        let res = await fetch(`${baseUrl}/users/delete/${data}`, {
            method: "DELETE",
            headers:{
                "Authorization":token
            }
        });
        swal("Deleted","","success").then(()=>{
            window.location.href="admin.html"
        })  
      
    } catch (error) {
        console.log(error)
    }
}



function userCard(id, username, email) {
    return `
        <div class="card-wrapper">
        <span>ID</span><input id="id" value="${id}"  readonly>
        <span>username</span><input id="title" value="${username}"  readonly>
        <span>email</span><input id="hour" value="${email}"  readonly>
        <div class="list-buttons">
        <button class="delete-user" data-id="${id}" >Delete User</button>
        </div>
        </div>
    `;
   
}




// ---------------------------------------------------------------------------------




// show products data---------------------------------------------------------------
var arr;
let showButton = document.querySelector(".show-products");
showButton.addEventListener("click", async function () {
    try {
        let res = await fetch(`${baseUrl}/products`);
        let data = await res.json();
        arr=data
        let count = data.length
        console.log(count)
        let totalPages = Math.ceil(count / 10)
        renderPagination(totalPages);
        var new_arr = arr.slice(0, 10)
        getData(new_arr);
       let length=document.getElementById("data-length")
       length.innerText=`Total:${data.length}`
    } catch (error) {
        console.log(error)
    }
});



function getAsCard(id, image, price, name, type, category) {
    return `
        <div class="card-wrapper">
        <img src="${image}" alt="image">
        <br>
        <span>Id</span><br><input id="user" value="${id}"  readonly>
        <span>Name</span><input id="name" value="${name}"  readonly>
        <span>Price</span><input id="price" value="${price}"  readonly>
        <span>Type</span><input id="type" value="${type}"  readonly>
        <span>Category</span><input id="category" value="${category}"  readonly>
          <div class="list-buttons">
          <button class="delete-data" data-id="${id}" >Delete Product</button>
          <button class="edit-data" data-id="${id}" >Edit</button>
          </div>
        </div>
    `;
}

function getData(data) {
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
      <div class="card-list">
          ${data
            .map((item) => {
                let id = item._id;
                let image = item.image;
                let name = item.name;
                let price = item.price;
                let type = item.type;
                let category = item.category;
                return getAsCard(id, image, name,price, type, category);
            })
            .join("")}
      </div>
  `;

    let deletingData = document.querySelectorAll(".delete-data");
    for (let deleteButton of deletingData) {
        deleteButton.addEventListener("click", function (element) {
            let data = element.target.dataset.id;
            deleteFunction(data)
        })
    }

    let editData= document.querySelectorAll(".edit-data");
    for (let editButton of editData) {
        editButton.addEventListener("click", (e)=>{
            let data = e.target.dataset.id;
            editFunction(data)
        })
    };

}


async function deleteFunction(data) {
    try {

        let res = await fetch(`${baseUrl}/products/delete/${data}`, {
            method: "DELETE",
            headers:{
                "Authorization":token
            }
        });
        swal("Deleted","","success").then(()=>{
            Fetching();
        })  
      
    } catch (error) {
        console.log(error)
    }
}

function editFunction(data) {
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
        <div class="card-wrapper">
        <span>ID</span><br> <input id="id" value=${data} readonly>
        <span>Name</span><input id="addDescription">
        <span>Price</span><input id="addprice">
        <span>Image Url</span><input id="addimage">
        <span>Type</span><input id="addtype">
        <span>Category</span><input id="addcategory">
          <div class="list-buttons">
          <button class="edit-data">Save</button>
          </div>
        </div>
    `;


    let editProduct = document.querySelector(".edit-data");
    editProduct.addEventListener("click", () => {
        let name = document.querySelector("#addDescription").value;
        let price = document.querySelector("#addprice").value;
        let image = document.querySelector("#addimage").value;
        let type = document.querySelector("#addtype").value;
        let category = document.querySelector("#addcategory").value;
        let amount=+price
        let obj={}

if(name!=""){
    obj.name=name
}
if(price!=""){
    obj.price=amount
}
if(image!=""){
    obj.image=image
}
if(type!=""){
    obj.type=type
}
if(category!=""){
    obj.category=category
}
        saveedit(obj,data)
    })
}
   
async function saveedit(obj,data){
try {

        let req = await fetch(`${baseUrl}/products/update/${data}`, {
            method: "PATCH",
            headers:{
                "content-type":"application/json",
                "Authorization":token
            },
            body:JSON.stringify(obj)
        });
        let res=await req.json()
        if(res.msg=="updated"){
        swal("Data updated","","success")
        }else{
            console.log(res)
        }
    } catch (error) {
        console.log(error)
    }

}

async function Fetching() {
    try {
        let res = await fetch(`${baseUrl}/products`);
        let data = await res.json();
        getData(data);
        let length=document.getElementById("data-length")
        length.innerText=`Total:${data.length}`
        }
    catch (error) {
        console.log(error);
    }
}


// add new product-----------------------------------------------------------

let addButton = document.querySelector(".add-products");
addButton.addEventListener("click", addproduct);


function addproduct() {
    dataListWrapper.innerHTML = "";
    dataListWrapper.innerHTML = `
        <div class="card-wrapper">
        <span>Name</span><input id="addDescription">
        <span>Price</span><input id="addprice">
        <span>Image Url</span><input id="addimage">
        <span>Type</span><input id="addtype">
        <span>Category</span><input id="addcategory">
          <div class="list-buttons">
          <button class="save-data">Save</button>
          </div>
        </div>
    `;




    let savingProduct = document.querySelector(".save-data");
    savingProduct.addEventListener("click", () => {
        let name = document.querySelector("#addDescription").value;
        let price = document.querySelector("#addprice").value;
        let image = document.querySelector("#addimage").value;
        let type = document.querySelector("#addtype").value;
        let category = document.querySelector("#addcategory").value;
        let amount=+price

        let obj = {
            name,
            price:amount,
            image,
            type,
            category
        };

        saveProduct(obj);
    })
}

async function saveProduct(data) {
    try {
        let res = await fetch(`${baseUrl}/products/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                    "Authorization":token
    
            },
            body: JSON.stringify(data)
        });
        let ans= await res.json()
        if (ans.msg=="Product Added sucessfully") {
            swal("Product Added sucessfully","","success")
        }
        else{
           console.log(ans)
        }
    } catch (error) {
        console.log(error)
    }
}



///// pagination------------------------------------------------------------------------


let paginationWrapper=document.querySelector(".pagination-section")
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
            var newarr = arr.slice((dataId - 1) * 10, 10 * dataId)
            getData(newarr);
        })
    }
}



function getAsButton(pageNumber) {
    return `<button class="pagination-button" data-id=${pageNumber}>${pageNumber}</button>`
}

