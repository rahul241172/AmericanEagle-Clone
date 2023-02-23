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
        let new_arr = arr.slice(0, 15)
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
                let id = item.id
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
}


function getAsCard(id, image, name, price, type, category) {
    return `
        <div class="card-wrapper">
        <div class="imagediv">
        <img src="${image}" alt="image">
        </div>
        <br>
        <div class="title">
        <span>${name}</span>
        <p class="price">${price}</p>
           </div>
          <div class="list-buttons">
          <button class="add-data" data-id="${id}" >Add to Cart</button>
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

    // whenever this line executes, are we sure that the buttons are present on the dom? yes

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

// id=1
// <button class="pagination-button" data-id="1">1</button>

function getAsButton(pageNumber) {
    return `<button class="pagination-button" data-id=${pageNumber}>${pageNumber}</button>`
}