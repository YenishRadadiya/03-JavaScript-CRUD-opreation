const table = document.getElementById("product_table");
const sortOptions = document.getElementById("sortOptions");
var prod_list = JSON.parse(localStorage.getItem("crud_product")) || [];
const no_product = document.getElementById("no-product");

// Function to append a single product row
export function appendProductRow(product) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <td style="width: 5%">${product.prod_id}</td>
        <td style="width: 15%"><img src="${product.prod_img}" alt="Product" /></td>
        <td style="width: 20%"><p>${product.prod_name}</p></td>
        <td style="width: 35%"><p>${product.prod_desc}</p></td>
        <td style="width: 10%">${product.prod_price}</td>
        <td style="width: 15%">
            <button class="btn_view" onclick="window.location.href='./Pages/Product.html?id=${product.prod_id}'">View <i class="fa fa-eye"></i></button>
            <button class="btn-edit" onclick="window.location.href='./Pages/AddProduct.html?mode=edit&id=${product.prod_id}'">Edit <i class="fa fa-edit"></i></button>
            <button class="btn-dlt" onclick="handleOperation(${product.prod_id})">Delete <i class="fa fa-trash-o"></i></button>
        </td>`;

    table.appendChild(tr);
}


// Function to load products into the table
export function loadProducts() {
    table.innerHTML = `
        <tr>
            <th>No.</th>
            <th>Product</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th></th>
        </tr>`;

    if (prod_list.length === 0) {
        no_product.style.display = "block";
    } else {
        no_product.style.display = "none";
        prod_list.forEach(product => appendProductRow(product));
    }
}

// Clear all function
export function handleClearAll() {
    localStorage.clear();
    window.location.reload();
}

// Delete Product function
export function handleOperation(id) {
    prod_list = prod_list.filter(product => product.prod_id !== id);
    localStorage.setItem("crud_product", JSON.stringify(prod_list));
    loadProducts();
}

// Search function
export function searchProduct() {
    let id = parseInt(document.getElementById("search_id").value);
    let filteredList = prod_list.filter(product => product.prod_id === id);

    table.innerHTML = `
        <tr>
            <th>No.</th>
            <th>Product</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th></th>
        </tr>`;

    if (filteredList.length > 0) {
        filteredList.forEach(product => appendProductRow(product));
    } else {
        alert('Product not found')
    }
}

// Sorting function
export function sortProducts() {
    let criteria = sortOptions.value;

    prod_list.sort((a, b) => {
        if (criteria === "id") {
            return a.prod_id - b.prod_id;
        } else if (criteria === "name") {
            return a.prod_name.localeCompare(b.prod_name);
        } else if (criteria === "price") {
            return a.prod_price - b.prod_price;
        }
    });

    localStorage.setItem("crud_product", JSON.stringify(prod_list));
    loadProducts();
}

document.getElementById("sortButton").addEventListener("click", sortProducts);

loadProducts();
