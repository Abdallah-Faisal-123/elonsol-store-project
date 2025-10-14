
var productNameinput = document.getElementById("productname");
var productpriceinput = document.getElementById("productprice");
var productcategoryinput = document.getElementById("productcategory");
var productdescriptioninput = document.getElementById("productdescription");
var productimageinput = document.getElementById("productimage");
var containerelement = document.getElementById("containerelement");
var productlist = []


if (localStorage.getItem("productlist")) {
    productlist = JSON.parse(localStorage.getItem("productlist"));
    display(productlist)
}

function addproduct() {
    var product =
    {
        productname: productNameinput.value,
        productprice: productpriceinput.value,
        productcategory: productcategoryinput.value,
        productdescription: productdescriptioninput.value,
        productimage: productimageinput.files[0].name
    }
    productlist.push(product)

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
}


function display(targetList)
 {
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
                            <i class="fa-solid fa-pen-to-square fs-5 text-success"></i>
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



function searchbyproductname(searchvalue) {
    var filter = []

    for (var i = 0; i < productlist.length; i++) {
        if (productlist[i].productname.toLowerCase().includes(searchvalue.toLowerCase())) {
            filter.push(productlist[i]);
            
        }
    }
    display(filter  )
}

