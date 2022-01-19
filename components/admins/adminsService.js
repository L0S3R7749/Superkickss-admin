const User = require("../../models/schema/User");
const bcrypt = require('bcrypt');

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
  },

  checkExist: (username, email, phone) => {
    return User.findOne({$and: [
      {$or: [
          {username: username},
          {email: email},
          {phoneNumber: phone}
      ]},
      {userRight: 'admin'}]}).lean();
  },

  addAdmin: (reqBody) => {
    console.log(reqBody);
    const newAdmin = new User({
      fullname: reqBody.fullname,
      username: reqBody.username,
      password: bcrypt.hashSync(reqBody.username,10),
      email: reqBody.email,
      phoneNumber: reqBody.phone,
      addresses: reqBody.address,
      userRight: 'admin',
    });
    return newAdmin.save();
  },

  updateAdmin: (id, data) => {
    return User.findByIdAndUpdate(id, data, {
      useFindAndModify: false,
      returnDocument: 'after'
    });
  },

  changePassword: (id, password) => {
    return User.findByIdAndUpdate(id, {
        $set: {
            password: password
        }
      });
  }
}