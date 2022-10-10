var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var searchInput = document.getElementById("searchInput");
var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlert = document.getElementById("productPriceAlert");

const pi = 3.14;

var productsList ;

var productNameRegex = /^[A-Z][a-z]{3,6}$/gm;
var productPriceRegex = /^([1-9][0-9]{2,3}|10000)$/gm;

productNameInput.addEventListener("blur",validateProductName);
productPriceInput.addEventListener("blur",validateProductPrice);



if (localStorage.getItem("ourProducts")==null) {
    productsList = [];
} else {
    productsList = JSON.parse(localStorage.getItem("ourProducts"));
    displayProduct(productsList);
}

function addProduct() {

var product={
    productName:productNameInput.value,
    productPrice:productPriceInput.value,
    productCategory:productCategoryInput.value,
    productDesc:productDescInput.value,
}

productsList.push(product);
localStorage.setItem("ourProducts",JSON.stringify(productsList));
displayProduct(productsList);
clearForm();
    
}

 document.getElementById("products").addEventListener("click", getRow);
    //  document.getElementById(e.path[1].id).style.background = "gray";
    //  console.log(e.path);
 


 function getRow(e) {
     let rowId = e.path[1].id;
     for (let i = 0; i < productsList.length; i++) {
         if (rowId == i) {
             document.getElementById(rowId).style.background="gray";
              
         }
         else{
             document.getElementById(i).style.background="white";
             
         }
         
     }

     productNameInput.value = productsList[rowId].productName;
     productPriceInput.value = productsList[rowId].productPrice;
     productCategoryInput.value = productsList[rowId].productCategory;
     productDescInput.value = productsList[rowId].productDesc;

 }

 function updateProduct(index) {
    var product={
        productName:productNameInput.value,
        productPrice:productPriceInput.value,
        productCategory:productCategoryInput.value,
        productDesc:productDescInput.value,
    }
    
    productsList.splice(index,1,product);
    localStorage.setItem("ourProducts",JSON.stringify(productsList));
    displayProduct(productsList);
    clearForm();
     
 }


 function displayProduct(displayList) {
     
    var ProductsHtmlString = "";
for (let i = 0; i < displayList.length; i++) {
    
    ProductsHtmlString += ` <tr id=${i}>
    <td>${i+1}</td>
    <td>${displayList[i].productName}</td>
    <td>${displayList[i].productPrice}</td>
    <td>${displayList[i].productCategory}</td>
    <td>${displayList[i].productDesc}</td>
    <td> <button onclick="updateProduct(${i})" class="btn btn-warning">update</button></td>
    <td> <button onclick=deleteProduct(${i}) class="btn btn-danger">delete</button></td>
</tr>`;
 }
 document.getElementById("products").innerHTML = ProductsHtmlString;
//  window.alert("ProductsHtmlString : " + ProductsHtmlString);
//  window.alert("innerhtml : "+document.getElementById("products").innerHTML);
}

function clearForm() {
    
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function deleteProduct(index) {
    productsList.splice(index,1);
    localStorage.setItem("ourProducts",JSON.stringify(productsList));
    displayProduct(productsList);
    
}

function searchProduct() {
     var searchWord = searchInput.value;
     
     var wantedProducts=[];

     for (let i = 0; i < productsList.length; i++) {
         if (productsList[i].productName.toLowerCase().includes(searchWord.toLowerCase())) {
             wantedProducts.push(productsList[i]);
         }

         

         displayProduct(wantedProducts);
         
     }

}

function validateProductName() {
    

    if (productNameRegex.test(productNameInput.value) == true) {
        
        productNameInput.classList.remove("is-invalid");
        productNameAlert.classList.replace("d-block","d-none");

    } else {
        productNameInput.classList.add("is-invalid");
        productNameAlert.classList.replace("d-none","d-block");
    }
    
}

function validateProductPrice() {
    if (productPriceRegex.test(productPriceInput.value) == true) {
        
        productPriceInput.classList.remove("is-invalid");
        productPriceAlert.classList.replace("d-block","d-none");

    } else {
        productPriceInput.classList.add("is-invalid");
        productPriceAlert.classList.replace("d-none","d-block");
    }
}




