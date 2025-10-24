
var productNameinput = document.getElementById("productname");
var productpriceinput = document.getElementById("productprice");
var productcategoryinput = document.getElementById("productcategory");
var productdescriptioninput = document.getElementById("productdescription");
var productimageinput = document.getElementById("productimage");
var containerelement = document.getElementById("containerelement");
var addBtn = document.getElementById("addBtn");
var productlist = []
var editIndex = -1;



if (localStorage.getItem("productlist")) {
    productlist = JSON.parse(localStorage.getItem("productlist"));
    display(productlist)
}

function addproduct() {

    if (!validateInputsRegex()) return;
    var imageName = productimageinput.files[0]
        ? productimageinput.files[0].name
        : (editIndex !== -1 ? productlist[editIndex].productimage : "");

    var product =
    {
        productname: productNameinput.value,
        productprice: productpriceinput.value,
        productcategory: productcategoryinput.value,
        productdescription: productdescriptioninput.value,
        productimage: imageName
    }



    if (
        !productNameinput.value ||
        !productpriceinput.value ||
        !productcategoryinput.value ||
        !productdescriptioninput.value

    ) {
        var inputs = document.querySelectorAll(".inputs");

        inputs.forEach(function (input) {
            if (!input.value) {
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");

            } else {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            }
        });
        return;
    }

    if (editIndex !== -1) {
        productlist[editIndex] = product;
        editIndex = -1;
        addBtn.textContent = "Add Product";
    } else {
        productlist.push(product)
    }



    localStorage.setItem("productlist", JSON.stringify(productlist))

    display(productlist)

    resetallinputs()




}

function resetallinputs() {
    productNameinput.value = null,
        productpriceinput.value = null,
        productcategoryinput.selected = true,
        productdescriptioninput.value = null,
        productimageinput.value = null

    var inputs = document.querySelectorAll(".inputs");
    inputs.forEach(function (input) {
        if (!input.value) {
            input.classList.remove("is-invalid");
            input.classList.remove("is-valid");
        } else {
            input.classList.remove("is-valid");
            input.classList.remove("is-invalid");
        }
    })

}


function display(targetList) {
    var productstr = ``;
    for (var i = 0; i < targetList.length; i++) {
        productstr += `<div class="col">
                <div class="item border shadow-sm p-3">
                    <div class="    img-container mb-3">
                        <img src="images/${targetList[i].productimage}" alt="" class="w-100 h-100 object-fit-contain">
                    </div>
                    <h3 class="fs-5">${targetList[i].productname}</h3>
                    <p class="text-secondary">${targetList[i].productdescription}</p>
                    <p><span class="fw-semibold">Category:</span> ${targetList[i].productcategory}</p>
                    <div class="d-flex justify-content-between">
                        <p class="fw-semibold">${targetList[i].productprice} EGP</p>
                        <div>
                            <i onclick ="deleteproduct(${i})" class="fa-solid fa-trash-can fs-5 text-danger"></i>
                            <i onclick = "editProduct(${i})" class="fa-solid fa-pen-to-square fs-5 text-success"></i>
                        </div>
                    </div>
                </div>
            </div>`
    }

    containerelement.innerHTML = productstr;
}

function deleteproduct(deleteindex) {
    productlist.splice(deleteindex, 1)
    localStorage.setItem("productlist", JSON.stringify(productlist))
    display(productlist)
}

function editProduct(i) {
    var product = productlist[i];

    productNameinput.value = product.productname;
    productpriceinput.value = product.productprice;
    productcategoryinput.value = product.productcategory;
    productdescriptioninput.value = product.productdescription;


    editIndex = i;
    addBtn.textContent = "Update Product";
}

function validateInputsRegex() {
    const patterns = {
        name: /^[\p{L}0-9 _\-]{2,50}$/u,
        price: /^(?:[2-9]\d|[1-9]\d{2,})$/,
        category: /^(?!\s*$).+/,
        description: /^.{5,500}$/,
        image: /^[^\\\/:\*\?"<>\|]{1,255}\.(jpe?g|png|gif|webp|svg)$/i
    };

    let valid = true;

    document.querySelectorAll(".inputs").forEach(input => {
        let isValid = true;
        const textMsg = input.closest(".form-floating").querySelector(".text");

        if (input === productNameinput) {
            isValid = patterns.name.test(input.value.trim());
        } else if (input === productpriceinput) {
            isValid = patterns.price.test(input.value.trim());
        } else if (input === productcategoryinput) {
            isValid = patterns.category.test(input.value.trim());
        } else if (input === productdescriptioninput) {
            isValid = patterns.description.test(input.value.trim());
        } else if (input === productimageinput && input.files.length > 0) {
            isValid = patterns.image.test(input.files[0].name);
        }

        if (!isValid) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            if (textMsg) textMsg.classList.add("d-block");
            valid = false;
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
            if (textMsg) textMsg.classList.remove("d-block");
        }
    });

    return valid;
}

function searchbyproductname(searchvalue) {
    var filter = []

    for (var i = 0; i < productlist.length; i++) {
        if (productlist[i].productname.toLowerCase().includes(searchvalue.toLowerCase())) {
            filter.push(productlist[i]);

        }
    }
    display(filter)
}

