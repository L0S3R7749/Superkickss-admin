const Product = require('../../models/schema/Product');
const Order = require('../../models/schema/Order');

module.exports = {
    top_ten_best_seller: (interval) => {
        let pipeline = [
            {$match: {
                status: "completed" 
            }}, 
            {$project: {
                _id: 0, 
                createdDate: 1, 
                items: 1 
            }},
            {$unwind: "$items"},
            {$group: {
                _id: "$items.itemId",
                totalSaleQuantity: { $sum: "$items.quantity" },
            }},
            {$sort: { totalSaleQuantity: -1 }},
            {$limit: 10},
            {$lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product_info"
            }}
        ]
        return Order.aggregate(pipeline);
    },
    revenue: (interval_string) => {
        let pipeline;
        if (interval_string === "day") {
            pipeline = [
                {$match: { status: "completed" }}, 
                {$group: {
                    _id: { year: { $year: "$createdDate"}, month: { $month: "$createdDate"}, day: { $dayOfMonth: "$createdDate"} },
                    total_revenue: { $sum: "$totalPrice"}
                }},
                {$sort: { _id: -1 }}
            ]
        } else if (interval_string === "week") {
            pipeline = [
                {$match: { status: "completed" }}, 
                {$group: {
                    _id: { year: { $year: "$createdDate"}, week: { $week: "$createdDate"} },
                    total_revenue: { $sum: "$totalPrice"}
                }},
                {$sort: { _id: -1 }}
            ]
        } else if (interval_string === "month") {
            pipeline = [
                {$match: { status: "completed" }}, 
                {$group: {
                    _id: { year: { $year: "$createdDate"}, month: { $month: "$createdDate"} },
                    total_revenue: { $sum: "$totalPrice"}
                }},
                {$sort: { _id: -1 }}
            ]
        } else if (interval_string === "quarter") {
            pipeline = [
                {$match: { status: "completed" }},
                {$project: {
                    createdDate: 1,
                    totalPrice: 1,
                    quarter: {
                        $cond: [
                            { $lte: [{ $month: "$createdDate" }, 3]},
                            1,
                            {
                                $cond: [
                                    { $lte: [{ $month: "$createdDate" }, 6]},
                                    2,
                                    {
                                        $cond: [
                                            { $lte: [{ $month: "$createdDate" }, 9]},
                                            3,
                                            4,
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }},
                {$group: {_id: { year: { $year: "$createdDate" }, quarter: "$quarter" }, total_revenue: { $sum: "$totalPrice" }}},
                {$sort: { _id: -1 }}
            ]
        } else if (interval_string === "year") {
            pipeline = [
                {$match: { status: "completed" }}, 
                {$group: {
                    _id: { year: { $year: "$createdDate"} },
                    total_revenue: { $sum: "$totalPrice"}
                }},
                {$sort: { _id: -1 }}
            ]
        } else {
            pipeline = [
                {$match: { status: "completed" }}, 
                {$group: {
                    _id: { year: { $year: "$createdDate"}, month: { $month: "$createdDate"} },
                    total_revenue: { $sum: "$totalPrice"}
                }},
                {$sort: { _id: -1 }}
            ]
            console.log(pipeline)
        }
    
        return Order.aggregate(pipeline);
    }
}