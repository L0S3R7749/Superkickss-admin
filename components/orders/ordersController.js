const services = require('./ordersService');

module.exports = {
    get_all_orders: async (req,res) => {
        try {
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
            const orders = await services.list_orders(page);
            const countAll = await services.customCount();
            const pages = Math.ceil(countAll[0].num_orders / 5);

            res.render('./homepage/index', {
                title: "Orders",
                body: "../orders/orders",
                home: "/orders?",
                currentRoute: "/orders",
                orders: orders,
                current: page,
                pages: pages,
            });
            
        } catch(err) {
            console.log(err.message);
        }
    },

    search: async (req,res) => {
        try {
            const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
            const orders = await services.search_list(req.query.search, page);
            const countAll = await services.customCount(req.query.search);
            const pages = Math.ceil(countAll[0].num_orders / 5);

            res.render('./homepage/index', {
                title: "Search Results",
                body: "../orders/orders",
                home: `/orders/search?search=${req.query.search}&`,
                currentRoute: "/orders",
                orders: orders,
                current: page,
                pages: pages,
            });
        } catch(err) {
            console.log(err.message);
        }
    },

    get_order_detail: async (req,res) => {
        try {
            const targetOrder = await services.single_order(req.params.id);

            res.render('./homepage/index',{
                title: 'Detail',
                body: '../orders/detail',
                order: targetOrder
            });
        } catch(err) {
            console.log(err.message);
        }
    },

    update_status: async (req, res) => {
        try {
            const orderId = req.params.id;
            const { newStatus } = req.body;
            const currentStatus = await Order.findById(_id).status;

            const statusUpdatedOrder = await services.update_status(orderId, currentStatus, newStatus);
            
            if (!statusUpdatedOrder) {
                return res.json({
                    message: `Can't set ${newStatus} state to this order !!!`
                })
            } 
            res.json({
                order: statusUpdatedOrder,
                message: "Updated succesfully"
            })
        } catch (err) {
            console.log(err.message);
        }
    }
};