const User = require("../../models/schema/User");
const Order = require("../../models/schema/Order");

module.exports = {
    list_orders: (page=1,perPage=5) => {
        return Order
            .find()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate('user_id')
    },

    countAllOrders: () => {
        return Order.count();
    },

    search_list: (searchString, page=1, perPage=5) => {
        return Order
            .aggregate([
                {$lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_id',
                }},
                {$unwind: '$user_id'},
                {$match: {
                    $or: [
                        {'user_id.fullname': {$regex: (searchString) ? searchString : "", $options: 'i'}},
                        {'user_id.username': {$regex: (searchString) ? searchString : "", $options: 'i'}}
                    ]
                }},
                {$skip: (perPage * page) - perPage},
                {$limit: 5}
            ]);
    },

    customCount: (searchString) => {
        return Order
            .aggregate([
                {$lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_id',
                }},
                {$unwind: '$user_id'},
                {$match: {
                    $or: [
                        {'user_id.fullname': {$regex: (searchString) ? searchString : "", $options: 'i'}},
                        {'user_id.username': {$regex: (searchString) ? searchString : "", $options: 'i'}}
                    ]
                }},
                {$count: 'num_orders'}
            ]);
    }
};