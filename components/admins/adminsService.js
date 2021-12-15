const User = require("../../models/schema/User");

module.exports = {
  list_admins: (page=1,perPage=5) => {
    return User
        .find({userRight: 'admin'})
        .skip((perPage * page) - perPage)
        .limit(perPage);
  },

  search_list: (searchString, page=1, perPage=5) => {
    let myQuery = {};
    myQuery.$and = [
      {userRight: 'admin'},
      {fullname: {$regex: (searchString) ? searchString : "", $options: 'i'}}
    ];
    return User
        .find(myQuery)
        .skip((perPage * page) - perPage)
        .limit(perPage);
  },

  customCount: (searchString) => {
    let myQuery = {};
    myQuery.$and = [
      {userRight: 'admin'},
      {fullname: {$regex: (searchString) ? searchString : "", $options: 'i'}}
    ];
    return User
        .countDocuments(myQuery);
  },

  findTargetAdmin: (id) => {
    return User.findById(id);
  }
}