const prod_list = JSON.parse(localStorage.getItem("crud_product")) || [];
const urlParams = new URLSearchParams(window.location.search);
let prod_id = parseInt(urlParams.get("id"));

let title = document.getElementById("page_title");
title.innerText = "Edit Product";

let productIndex = prod_list.findIndex(p => p.prod_id === prod_id);

if (productIndex === -1) {
    alert("Product not found!");
    window.location.href = "product-list.html";
}

let prod = prod_list[productIndex];

let prod_name = document.getElementById("txt_product_name");
let prod_desc = document.getElementById("txt_product_desc");
let prod_price = document.getElementById("txt_product_price");
let fileInput = document.getElementById("img_product");
let imgPreview = document.getElementById("img_preview");

prod_name.value = prod.prod_name;
prod_desc.value = prod.prod_desc;
prod_price.value = prod.prod_price;

if (prod.prod_img) {
    imgPreview.src = prod.prod_img;
    imgPreview.style.display = "block";
}

//  validation for Name (50 characters limit)
prod_name.addEventListener("input", function () {
    if (prod_name.value.length > 50) {
        alert("Product name must be 50 characters or less!");
        prod_name.value = prod_name.value.substring(0, 50);
    }
});

//  validation for Description (200 characters limit)
prod_desc.addEventListener("input", function () {
    if (prod_desc.value.length > 200) {
        alert("Product description must be 200 characters or less!");
        prod_desc.value = prod_desc.value.substring(0, 150);
    }
});
document.getElementById("txt_product_price").addEventListener("input", function (event) {
    if (this.value < 0) {
        this.value = ""; // Reset field if a negative value is entered
    }
});

// File validation on file selection
fileInput.addEventListener("change", function () {
    let file = fileInput.files[0];

    if (!file) return;

    // Check file size limit (1MB)
    if (file.size > 1024 * 1024) {
        alert("File size must be less than 1MB!");
        fileInput.value = "";
        imgPreview.style.display = "none";
        return;
    }

    // Show image preview
    let reader = new FileReader();
    reader.onload = function (event) {
        imgPreview.src = event.target.result;
        imgPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
});

const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = prod_name.value.trim();
    const description = prod_desc.value.trim();
    const price = prod_price.value.trim();

    if (name === "" || description === "" || price === "") {
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

    function updateProduct(base64Image) {
        prod_list[productIndex] = {
            ...prod_list[productIndex],
            prod_name: name,
            prod_desc: description,
            prod_price: price,
            prod_img: base64Image || prod.prod_img
        };

        localStorage.setItem("crud_product", JSON.stringify(prod_list));

        alert("Product updated successfully!");
        window.location.href = "../index.html";
    }

    if (fileInput.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function (event) {
            updateProduct(event.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        updateProduct(null);
    }
});
