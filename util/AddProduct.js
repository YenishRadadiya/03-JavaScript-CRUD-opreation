// import Product from "./Product.js";
var prod_id = 1;
var prod_name, prod_desc, prod_img, prod_price;
var base64String;
function imageUploaded() {

    base64String = "";

    let file = document.querySelector(
        'input[type=file]')['files'][0];

    let reader = new FileReader();
    console.log("next");

    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");

        imageBase64Stringsep = base64String;
        // alert(imageBase64Stringsep);
        console.log(base64String);
    }
    reader.readAsDataURL(file);
    return base64String;
}

const productForm = document.getElementById("product-form");
// const errorMessages = document.getElementById("errorMessages");

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const { name, description, price } = productForm.elements;
    prod_name = name.value;
    prod_desc = description.value;
    prod_price = price.value;
    prod_img = imageUploaded();
    localStorage.setItem('')
});

// const prod = new Product(prod_id, prod_name, prod_price, prod_img, prod_desc);

// export { prod };
prod_id++;