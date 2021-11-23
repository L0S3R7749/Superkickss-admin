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

if (window.location.pathname == "/products") {
    $ondelete = $("div.buttons a.btn-danger");
    $ondelete.click(function() {
        const id = $(this).attr('data-id');

        let request = {
            "url": `http://localhost:5000/products/api/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this product?")) {
            $.ajax(request).done(function(response) {
                alert("Remove product successfully!");
                location.reload();
            })
        }
    })
}