let baseUrl = "http://localhost:8080"

// show user details -------------------------------------------------------

let dataListWrapper = document.querySelector(".data-list-wrapper");
let showUsersButton = document.querySelector(".show-user-details");
showUsersButton.addEventListener("click", async function () {
    try {
        num = 3;
        let res = await fetch(`${baseUrl}/users`);
        let data = await res.json();
        dispaly_data(data)
    } catch (error) {
        console.log("error")
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
                let password = item.pass;
                return userCard(id, username, email, password);
            })
            .join("")}
      </div>
  `;

}


function userCard(id, username, email, password) {
    return `
        <div class="card-wrapper">
        <span>ID</span><input id="id" value="${id}"  readonly>
        <span>username</span><input id="title" value="${username}"  readonly>
        <span>email</span><input id="hour" value="${email}"  readonly>
        <span>password</span><input value="${password}"  readonly>
        </div>
    `;
}
// ---------------------------------------------------------------------------------




// show products data---------------------------------------------------------------

let showButton = document.querySelector(".show-products");
showButton.addEventListener("click", async function () {
    try {
        let res = await fetch(`${baseUrl}/products`);
        let data = await res.json();
        getData(data);
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

}


async function deleteFunction(data) {
    try {

        let res = await fetch(`${baseUrl}/products/delete/${data}`, {
            method: "DELETE"
        });
       Fetching();

    } catch (error) {
        console.log(error)
    }
}






let editData= document.querySelectorAll(".edit-data");
    for (let editButton of editData) {
        editButton.addEventListener("click", function (element) {
            let data = element.target.dataset.id;
            editFunction(data)
        })
    };
// async function editFunction(data) {
//     try {

//         let res = await fetch(`${baseUrl}/products/update/${data}`, {
//             method: "PATCH"
//         });
//        Fetching();

//     } catch (error) {
//         console.log(error)
//     }
// }


async function Fetching() {
    try {
        let res = await fetch(`${baseUrl}/products`);
        let data = await res.json();
        getData(data);
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
        <span></span><input id="addtitle">
        <span>Description</span><input id="addDescription">
        <span>Price</span><input id="addprice">
        <span>Image Url</span><input id="addimage">
          <div class="list-buttons">
          <button class="save-data">Save</button>
          </div>
        </div>
    `;




    let savingProduct = document.querySelector(".save-data");
    savingProduct.addEventListener("click", () => {
        let name = document.querySelector("#addtitle").value;
        let description = document.querySelector("#addDescription").value;
        let price = document.querySelector("#addprice").value;
        let image = document.querySelector("#addimage").value;
        let warranty = document.querySelector("#addwarranty").value;


        let obj = {
            name,
            description,
            price,
            image,
            warranty
        };

        saveProduct(obj);
    })
}

async function saveProduct(data) {
    try {
        let res = await fetch(`${baseUrl}/products/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            alert("product Added")
            // pageNot.innerText = "Course Successfully Added";
            // notification();
            // title = document.querySelector("#addtitle");
            // addcourse = document.querySelector("#addcourse");
            // addlesson = document.querySelector("#addlesson");
            // addhour = document.querySelector("#addhour");
            // adddescription = document.querySelector("#adddescription");
            // title.value = "";
            // addcourse.value = "";
            // addlesson.value = "";
            // addhour.value = "";
            // adddescription.value = "";
        }
    } catch (error) {
        // notification();
        console.log(error)
    }
}





