const User = require('../../models/schema/User');
const service = require('./adminsService');
//this router is temporary
module.exports = {
    get_admins_list: async (req,res)=>{
      try {
          const page = (!isNaN(req.query.page) && req.query.page > 0) ? parseInt(req.query.page) : 1;
          const admins = await service.list_admins(page);
          const countAll = await service.customCount();
          const pages = Math.ceil(countAll / 5);
    
          res.render('./homepage/index', {
            title: "Admins",
            body: "../auth/admins",
            home: "/admins?",
            currentRoute: "/admins",
            admins: admins,
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
        const admins = await service.search_list(req.query.search, page);
        const countAll = await service.customCount(req.query.search);
        const pages = Math.ceil(countAll / 5);
  
        res.render('./homepage/index', {
          title: "Search Results",
          body: "../auth/admins",
          home: `/admins/search?search=${req.query.search}&`,
          currentRoute: "/admins",
          admins: admins,
          current: page,
          pages: pages,
        });
  
      } catch(err) {
        console.log(err);
      }
    },

    get_admin_detail: async (req, res) => {
      try {
        const idTarget = req.params.id;
        const targetAdmin = await service.findTargetAdmin(idTarget);
  
        res.render('./homepage/index', {
          title: targetAdmin.fullname,
          body: "../auth/_detail",
          user: targetAdmin,
          option: 'UPDATE',
          isCreate: false,
          message: req.flash('error'),
        });
      } catch(err) {
        console.log(err);
      }
    },

    get_admin_addPage: (req, res) => {
      res.render('./homepage/index', {
        title: "Create new admin",
        body: "../auth/_detail",
        user: new User(),
        option: 'CREATE',
        isCreate: true,
        message: req.flash('error'),
      })
    },

    add_admin: async (req, res) => {
      try {
        if (!req.body)
          return res.redirect('/admins/create');
        const checkExist = await service.checkExist(req.body.username, req.body.email, req.body.phone);
        if (checkExist) {
          req.flash('error', 'This admin-account already exists!');
          res.redirect('/admins/create');
        } else {
          const newAdmin = await service.addAdmin(req.body);
          res.redirect(`/admins/detail/${newAdmin._id}`);
        }
      } catch(err) {
        console.log(err.message);
      }
    },

    edit_admin: async (req, res) => {
      try {
        const {
          fullname,
          address
        } = req.body;
        const dataUpdate = {
          fullname: fullname,
          addresses: address,
        };
        const updatedAdmin = await service.updateAdmin(req.params.id, dataUpdate);
        console.log(updatedAdmin);
        res.redirect(`/admins/detail/${req.params.id}`);
      } catch(err) {
        console.log(err.message);
      }
    },

    adminAccountAction: async (req, res) => {
      try {
        const {id} = req.body;
        const targetAdmin = await service.findTargetAdmin(id);
        let updatedAdmin = await service.updateAdmin(id, {isLock: !(targetAdmin.isLock)});
        res.status(200).send({message: 'Acction on account successfully!'});
      } catch(err) {
        console.log(err.message);
      }
    },

    get_changepassword: (req,res)=>{
      res.render('./auth/changepassword', {title: 'Change password'});
    }
}