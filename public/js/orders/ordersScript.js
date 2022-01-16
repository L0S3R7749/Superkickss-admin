var path = window.location.pathname;
if (path.match('/orders/detail')) {
    $(document).on('click', '.update-status', function(e) {
        e.preventDefault();
        
        let status = $(this).attr('data-status');
        $.ajax({
            url: path + '/status',
            method: 'POST',
            data: {
                newStatus: status
            },
            success: function (data) {
                console.log(data)
                let { updatedStatus, message } = data;
                $('#alert-pane').html(`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`);
                if (updatedStatus === "in progress") {
                    $('.order-header').html(`
                        <span class="order-status order-cancel bg-warning">
                            In Progress
                        </span>
                        <hr>
                        <div class="my-4">
                            <span id="shipping" class="update-status btn btn-primary mx-2" data-status="shipping">Shipping <i class="fas fa-chevron-right"></i></span>
                            <span id="cancel" class="update-status btn btn-danger mx-2" data-status="cancel">Cancel</span>                        
                        </div>`);
                } else if (updatedStatus === "shipping") {
                    $('.order-header').html(`
                        <span class="order-status order-shipping bg-primary">
                            Shipping
                        </span>
                        <hr>
                        <div class="my-4">
                            <span id="inprogress" class="update-status btn btn-light mx-2" data-status="in progress"><i class="fas fa-chevron-left"></i> In progress</span>
                            <span id="completed" class="update-status btn btn-primary mx-2" data-status="completed">Completed <i class="fas fa-chevron-right"></i></span>
                            <span id="cancel" class="update-status btn btn-danger mx-2" data-status="cancel">Cancel</span>
                        </div>`);
                } else if (updatedStatus === "completed") {
                    $('.order-header').html(`
                        <span class="order-status order-done bg-success">
                            Completed
                        </span>
                        <hr>`);
                }
            },
            error: function (data) {
                let { message } = data;
                $('#alert-pane').html(`
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        ${message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`);
            }
        })
    })
}