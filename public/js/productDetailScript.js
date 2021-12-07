if (window.location.pathname == "/products") {
    $ondelete = $("div.buttons a.btn-danger");
    $ondelete.click(function() {
        const id = $(this).attr('data-id');

        let request = {
            "url": `http://admin2-superkickss.herokuapp.com/products/api/${id}`,
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