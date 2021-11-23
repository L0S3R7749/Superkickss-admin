function onAddDetail() {
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;
    // const detailValue=document.getElementById('detail-value');
    const detailValue = document.querySelector('tbody');
    detailValue.innerHTML += `
        <tr class="row">
            <tr class="row">
                <td class="col-5"><input class="col-12" type="text" value="${size}"></td>
                <td class="col-5"><input class="col-12" type="text" value="${quantity}"></td>
            </tr>
        </tr>
    `;
}

function onRemoveProduct() {
    const id = document.getElementById('rmvBtn').getAttribute('data-id');
    console.log(id);
    const request = {
        "url":`http://localhost:5000/products/api/${id}`,
        "method":"DELETE" 
    }
    if (window.confirm("Do you really want to this product?")) {
        $.ajax(request).done(function(dataRes) {
            alert('Remove product successfully!');
        });
        window.location.href='http://localhost:5000/products';
        location.reload();
    }
} 