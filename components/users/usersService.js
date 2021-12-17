const User = require("../../models/schema/User");

module.exports = {
  list_users: (page=1,perPage=5) => {
    return User
        .find({userRight: 'user'})
        .skip((perPage * page) - perPage)
        .limit(perPage);
  },

  search_list: (searchString, page=1, perPage=5) => {
    let myQuery = {};
    myQuery.$and = [
      {userRight: 'user'},
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
      {userRight: 'user'},
      {fullname: {$regex: (searchString) ? searchString : "", $options: 'i'}}
    ];
    return User
        .countDocuments(myQuery);
  },

  findTargetUser: (id) => {
    return User.findById(id);
  },

  updateUser: (id, data) => {
    return User.findByIdAndUpdate(id, data, {
      useFindAndModify: false,
      returnDocument: 'after'
    });
  },
}