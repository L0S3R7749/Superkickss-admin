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

// function renderTopTenBestSeller() {
//     let topTen = getTopTenBestSeller();
//     let panel = document.querySelector("#top-ten-best-seller");
//     panel.innerHTML += `
//     `
// }

// async function getTopTenBestSeller() {
//     let data = await fetch('/topten', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         }
//     })
//     return data;
// }