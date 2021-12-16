const service = require("./usersService");

module.exports = {
  get_users_list: async (req, res) => {
    try {
      const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
      const users = await service.list_users(page);
      const countAll = await service.customCount();
      const pages = Math.ceil(countAll / 5);

      res.render('./homepage/index', {
        title: "Users",
        body: "../auth/accounts",
        home: "/users?",
        currentRoute: "/users",
        users: users,
        current: page,
        pages: pages,
      });

    } catch(err) {
      console.log(err);
    }
  },

  search: async (req, res) => {
    try {
      const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
      const users = await service.search_list(req.query.search, page);
      const countAll = await service.customCount(req.query.search);
      const pages = Math.ceil(countAll / 5);

      res.render('./homepage/index', {
        title: "Search Results",
        body: "../auth/accounts",
        home: `/users/search?search=${req.query.search}&`,
        currentRoute: "/users",
        users: users,
        current: page,
        pages: pages,
      })

    } catch(err) {
      console.log(err);
    }
  },

  get_user_detail: async (req, res) => {
    try {
      const idTarget = req.params.id;
      const targetUser = await service.findTargetUser(idTarget);

      res.render('./homepage/index', {
        title: targetUser.fullname,
        body: "../auth/_detail",
        user: targetUser,
        option: "UPDATE",
        isCreate: false,
        message: req.flash('error'),
      });
    } catch(err) {
      console.log(err);
    }
  },

  edit_user: async (req, res) => {
    res.send('Edit user page');
  },

  get_local_user_info: async (req, res) => {
    try {
      const idTarget = req.params.id;
      const targetUser = await service.findTargetUser(idTarget);

      res.render('./homepage/index', {
        title: targetUser.fullname,
        body: "../auth/_localuserinfo",
        user: targetUser,
      });
    } catch(err) {
      console.log(err);
    }
  }
}