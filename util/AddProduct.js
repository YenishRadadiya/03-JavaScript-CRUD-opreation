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

    let reader = new FileReader();

    reader.onload = function (event) {
        let base64String = event.target.result;
        preview.src = base64String;
        preview.style.display = "block";

        if (callback) callback(base64String);
    };

    reader.readAsDataURL(file);
}

const productForm = document.getElementById("product-form");

productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let product_list = localStorage.getItem("crud_product")
        ? JSON.parse(localStorage.getItem("crud_product"))
        : [];

    let prod_id = product_list.length > 0
        ? Math.max(...product_list.map(p => p.prod_id)) + 1
        : 1;

    const name = document.getElementById("txt_product_name").value.trim();
    const description = document.getElementById("txt_product_desc").value.trim();
    const price = document.getElementById("txt_product_price").value.trim();
    const fileInput = document.getElementById("img_product");

    if (name === "" || description === "" || price === "" || fileInput.files.length === 0) {
        alert("All fields are required!");
        return;
    }

    imageUploaded((base64Image) => {
        const product = new Product(prod_id, name, price, base64Image, description);
        product_list.push(product);
        localStorage.setItem("crud_product", JSON.stringify(product_list));

        productForm.reset();
        document.getElementById("img_preview").style.display = "none"; // Hide preview after submission
    });
});
