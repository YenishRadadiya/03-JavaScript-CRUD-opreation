import Product from "./Product.js";

let title = document.getElementById("page_title");
title.innerText = "Add Product";

export function imageUploaded(callback) {
    let fileInput = document.querySelector("#img_product");
    let preview = document.querySelector("#img_preview");
    let file = fileInput.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }

    // File size validation (1MB limit)
    if (file.size > 1024 * 1024) { // 1MB = 1024 * 1024 bytes
        alert("File size must be less than 1MB!");
        fileInput.value = "";
        preview.style.display = "none";
        return;
    }

    let reader = new FileReader();
    reader.onload = function (event) {
        let base64String = event.target.result;
        preview.src = base64String;
        preview.style.display = "block";

        if (callback) callback(base64String);
    };

    reader.readAsDataURL(file);
}

const nameInput = document.getElementById("txt_product_name");
const descriptionInput = document.getElementById("txt_product_desc");
const fileInput = document.getElementById("img_product");

//  validation for Name (50 characters limit)
nameInput.addEventListener("input", function () {
    if (nameInput.value.length > 50) {
        alert("Product name must be 50 characters or less!");
        nameInput.value = nameInput.value.substring(0, 50); // Trim extra characters
    }
});
document.getElementById("txt_product_price").addEventListener("input", function (event) {
    if (this.value < 0) {
        this.value = ""; // Reset field if a negative value is entered
    }
});


//  validation for Description (200 characters limit)
descriptionInput.addEventListener("input", function () {
    if (descriptionInput.value.length > 200) {
        alert("Product description must be 200 characters or less!");
        descriptionInput.value = descriptionInput.value.substring(0, 150);
    }
});

//  validation on file selection
fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0 && fileInput.files[0].size > 1024 * 1024) {
        alert("File size must be less than 1MB!");
        fileInput.value = "";
    }
});

const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let product_list = localStorage.getItem("crud_product")
        ? JSON.parse(localStorage.getItem("crud_product"))
        : [];

    let prod_id = product_list.length > 0
        ? Math.max(...product_list.map(p => p.prod_id)) + 1
        : 1;

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    const price = document.getElementById("txt_product_price").value.trim();

    // Validations before submitting
    if (name === "" || description === "" || price === "" || fileInput.files.length === 0) {
        alert("All fields are required!");
        return;
    }

    if (name.length > 50) {
        alert("Product name must be 50 characters or less!");
        return;
    }

    if (description.length > 200) {
        alert("Product description must be 200 characters or less!");
        return;
    }

    imageUploaded((base64Image) => {
        const product = new Product(prod_id, name, price, base64Image, description);
        product_list.push(product);
        localStorage.setItem("crud_product", JSON.stringify(product_list));

        productForm.reset();
        document.getElementById("img_preview").style.display = "none";
    });
});
