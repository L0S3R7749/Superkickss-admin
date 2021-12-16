var path = window.location.pathname;
if (path.match('/products') || path.match('/products/search')) {
    $ondelete = $("#confirmModal");
    $ondelete.on('show.bs.modal', function(e) {
        $(this).find('.modal-footer #confirm').attr('data-id',  $(e.relatedTarget).attr('data-id'));
        $(this).find('.modal-footer #confirm').on('click', async function() {
            const id = $(this).attr('data-id');
            try {
                const request = {
                    method: 'POST',
                    body: JSON.stringify({id}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                await fetch('/products', request);
                location.reload();
            } catch(err) {
                console.log(err.message);
            }
        });
    });
}