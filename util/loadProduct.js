const prod_list = JSON.parse(localStorage.getItem('crud_product'));
const urlParams = new URLSearchParams(window.location.search);
let prod;
let prod_id = urlParams.get('id');
let prod_img = document.getElementById('prod_img');
let prod_name = document.getElementById('prod_name');
let prod_desc = document.getElementById('prod_desc');
let prod_price = document.getElementById('prod_price');


for (let i = 0; i < prod_list.length; i++) {
    let obj = prod_list[i];
    if (prod_id == obj.prod_id) {
        prod = obj;
    }
}

prod_desc.innerText = prod.prod_desc;
prod_name.innerText = prod.prod_name;
prod_price.innerHTML = prod.prod_price;
prod_img.src = prod.prod_img;