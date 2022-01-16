var path = window.location.pathname;
if (document.querySelector("#top-ten-best-seller")) {
    $(window).on("load", function(e) {
        e.preventDefault();
        $.ajax({
            url: '/topten',
            method: 'GET',
            success: function (data) {
                console.log(data);
                renderTopTenProducts(data.top_ten_best_seller);
            },
            error: function (data) {
                console.log(data);
            }
        })
    })
}


function renderTopTenProducts(products) {
    let table = document.querySelector("#top-ten-table");

    products.map((product, index) => {
        table.innerHTML += `
            <br>
            <tr onclick="window.location='/products/detail?id=${product._id}';" style="border-top: 1pt solid black" class="col-lg-12">
                <td class="col-lg-1">${index + 1}</th>
                <td class="col-lg-5">${product.product_info[0].name}</th>
                <td class="col-lg-4">${product.product_info[0].brand}</th>
                <td class="col-lg-2">${product.totalSaleQuantity}</th>
            </tr>                        
        `;
    })
}


if (document.querySelector("#revenue-interval")) {
    $(window).on("load", function(e) {
        e.preventDefault();
        $.ajax({
            url: '/revenue',
            method: 'GET',
            data: {
                "interval": ""
            },
            success: function (data) {
                renderRevenue(data.revenue_by_interval, null)
                console.log(data)
            },
            error: function (data) {
                console.log(data);
            }
        })
    })
}

$(document).on("change", "#revenue-time-selection", function(e) {
    e.preventDefault();
    var value = $(this).val();
    $(this).parent().prev().html(`Revenue of ${value}`)
    $.ajax({
        url: '/revenue',
        method: 'GET',
        data: {
            "interval": value.toLowerCase()
        },
        success: function (data) {
            renderRevenue(data.revenue_by_interval, value.toLowerCase())
        },
        error: function (data) {
            console.log(data);
        }
    })
})

function renderRevenue(data, interval) {
    let table = document.querySelector("#revenue-interval-table");
    table.innerHTML = "";
    if (interval === "day") {
        data.map((dt) => {
            table.innerHTML += `
                <br>
                <tr style="border-top: 1pt solid black" class="col-lg-12">
                    <td class="col-lg-5">${dt._id.day}/${dt._id.month}/${dt._id.year}</th>
                    <td class="col-lg-7">$${dt.total_revenue}</th>
                </tr>
            `;
        })
    } else if (interval === "week") {
        data.map((dt) => {
            table.innerHTML += `
                <br>
                <tr style="border-top: 1pt solid black" class="col-lg-12">
                    <td class="col-lg-5">W${dt._id.week}/${dt._id.year}</th>
                    <td class="col-lg-7">$${dt.total_revenue}</th>
                </tr>
            `;
        })
    } else if (interval === "month") {
        data.map((dt) => {
            table.innerHTML += `
                <br>
                <tr style="border-top: 1pt solid black" class="col-lg-12">
                    <td class="col-lg-5">M${dt._id.month}/${dt._id.year}</th>
                    <td class="col-lg-7">$${dt.total_revenue}</th>
                </tr>
            `;
        })
    } else if (interval === "quarter") {
        data.map((dt) => {
            table.innerHTML += `
                <br>
                <tr style="border-top: 1pt solid black" class="col-lg-12">
                    <td class="col-lg-5">Q${dt._id.quarter}/${dt._id.year}</th>
                    <td class="col-lg-7">$${dt.total_revenue}</th>
                </tr>
            `;
        })
    } else if (interval === "year") {
        data.map((dt) => {
            table.innerHTML += `
                <br>
                <tr style="border-top: 1pt solid black" class="col-lg-12">
                    <td class="col-lg-5">${dt._id.year}</th>
                    <td class="col-lg-7">$${dt.total_revenue}</th>
                </tr>
            `;
        })
    } else {
        data.map((dt) => {
            table.innerHTML += `
                <br>
                <tr style="border-top: 1pt solid black" class="col-lg-12">
                    <td class="col-lg-5">${dt._id.month}/${dt._id.year}</th>
                    <td class="col-lg-7">$${dt.total_revenue}</th>
                </tr>
            `;
        })
    }    
}