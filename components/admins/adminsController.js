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
          })
    
        } catch(err) {
          console.log(err);
        }
    },
}