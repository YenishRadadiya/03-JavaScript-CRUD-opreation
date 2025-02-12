import { base64ToFile } from "./util/handleImage.js";
const table = document.getElementById('product_table');
var prod_list = JSON.parse(localStorage.getItem('crud_product'));
const no_product = document.getElementById('no-product');
export function handleClearAll() {
    localStorage.clear();
    window.location.reload();
}
export function handleOperation(id) {
    for (let i = 0; i < prod_list.length; i++) {
        let obj = prod_list[i];
        if (id = obj.prod_id) {
            prod_list.splice(i, 1);
        }
    }
    localStorage.setItem('crud_product', JSON.stringify(prod_list));
    window.location.reload();


}

if (!prod_list) {
    no_product.style.display = 'block';
}
else {
    no_product.style.visibility = 'none'
    for (let i = 0; i < prod_list.length; i++) {
        let obj = prod_list[i];
        let tr = document.createElement('tr');
        let url = base64ToFile(obj.prod_img, 'image/jpeg');
        tr.innerHTML = `<td style="width: 2%" name="prod_id" id="">${obj.prod_id}</td>
                                <td style="width: 30%" name="prod_image">
                                    <img src='${url}' alt="Product" />
                                </td>
                                <td style="width: 15%" name="prod_name" id="prod_name">${obj.prod_name}</td>
                                <td name="prod_desc">${obj.prod_desc}</td>
                                <td style="width: 5%" name="prod_price">${obj.prod_price}</td>
                                <td style="width: 10%">
                                    <button id="${obj.prod_id}" class="btn_view" onclick="window.location.href='./Pages/Product.html?id=${obj.prod_id}'" >View<i class="fa fa-eye" ></i></button>
                                    <button id="${obj.prod_id}" class="btn-edit" onclick="window.location.href='./Pages/AddProduct.html?mode=edit&id=${obj.prod_id}'" >Edit<i class="fa fa-edit" ></i></button>
                                    <button id="${obj.prod_id}" class="btn-dlt" onclick='handleOperation(${obj.prod_id})'>Delete<i class="fa fa-trash-o"></i></button>
                                </td>`;
        table.appendChild(tr);
    }

}

