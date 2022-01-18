const User = require("../../models/schema/User");
const Order = require("../../models/schema/Order");

module.exports = {
    list_orders: (page=1,perPage=5) => {
        return Order
            .aggregate([
                {$lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user_id',
                }},
                {$unwind: '$user_id'},
                {$skip: (perPage * page) - perPage},
                {$limit: 5}
            ]);
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
    },

    single_order: (id) => {
        return Order
            .findById(id)
            .populate('user_id')
            .populate('items.itemId');
    },

    update_status: async (_id, newStatus) => {
        let updateStatus = '';        
        const { status } = await Order.findById(_id).select('status -_id');
        if (status === 'in progress') {
            if (newStatus === 'cancel' || newStatus === 'shipping') {
                updateStatus = newStatus;
            }
        } else if (status === 'shipping') {
            if (newStatus === 'cancel' || newStatus === 'in progress' || newStatus === 'completed') {
                updateStatus = newStatus;
            }
        }
        if (updateStatus !== '') {
            return Order.findByIdAndUpdate(_id, {status: updateStatus});
        } else {
            return null;
        }
    }
};