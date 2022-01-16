const Product = require('../../models/schema/Product');
const Order = require('../../models/schema/Order');

module.exports = {
    top_ten_best_seller: (interval) => {
        let pipeline = [
            { $match: { status: "completed" } }, 
            { $project: { _id: 0, createdDate: 1, items: 1 } },
            { $unwind: "$items" },
            { $group: {
                    _id: "$items.itemId",
                    totalSaleQuantity: { $sum: "$items.quantity" },
                }
            },
            { $sort: { totalSaleQuantity: -1 } },
            { $limit: 10 },
            { $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product_info"
            }}
        ]
        return Order.aggregate(pipeline);
    }
}