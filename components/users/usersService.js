const bcrypt = require("bcrypt");
const User = require("../../models/schema/User");

exports.user_list_get = (req, res) => {
  let perPage = 5; // Number of users per page
  // let page = req.query.page || 1;
  let page= (!isNaN(req.query.page) && req.query.page > 0) ? req.query.page : 1;
  let myquery = {};
  // if (req.query.uright) {
  //   myquery.userRight = "admin";
  // }
  User.find(myquery)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, users) => {
      console.log(users);
      User.find(myquery).countDocuments((err, count) => {
        console.log(users);
        if (err) return next(err);
        res.send({
          users: users,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
};

exports.user_create_get = (req, res) => {
  res.send("Create new admin");
};

exports.user_create_post = async (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  try {
    const {
      fullname,
      username,
      password,
      confirmPassword,
      email,
      phoneNumber,
    } = req.body;
    if (password !== confirmPassword) {
      req.flash("error", "Confirm-password does not match!");
      res.redirect("/");
    } else {
      const checkExist = await findAdminUser({
        username,
        email,
        phoneNumber,
      }).exec();
      if (checkExist) {
        req.flash("error", "This user has already exists!");
        res.status(400).send(checkExist);
        return;
      } else {
        const hashedpassword = bcrypt.hashSync(password, 10);
        const user = new User({
          fullname: fullname,
          username: username,
          password: hashedpassword,
          email: email,
          phoneNumber: phoneNumber,
          userRight: "admin",
        });
        const newUser = await user.save();
        res.status(200).send({ user: newUser });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.user_detail_get = async (req, res, next) => {
  try {
    if (!req.params.id) return res.redirect("/");
    const user = await User.find({ id: req.params.id });
    res.send(user);
  } catch (error) {
    next(error);
  }
}

exports.user_edit_get = async (req, res, next) => {
  try {
    if (!req.params.id) return res.redirect("/");
    const user = await User.find({ id: req.params.id });
    res.send(user);
  } catch (error) {
    next(error);
  }
}

exports.user_edit_put = async (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  try {
    const {
      fullname,
      username,
      email,
      phoneNumber,
    } = req.body;
    const id = req.params.id;
    const update = { fullname: fullname, username: username, email: email, phoneNumber: phoneNumber };
    const updatedUser = await User.findByIdAndUpdate(id, update);
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
}

function findAdminUser(username, email, phone) {
  return User.findOne({$and: [
    {$or: [
      { username: username},
      {email: email},
      {phoneNumber: phone}
    ]},
    { userRight: 'admin'}
  ]}).lean();
}