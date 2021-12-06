const express = require("express");
const apicaller = require("../../public/js/apiCaller");
const upload = require("../../middlewares/multer");
const passport = require("../../middlewares/passport");
const checkAuth = require("../../middlewares/check-auth");
const User = require("../../models/schema/User");
const router = express.Router();

router.get("/", (req, res) => {
  let perPage = 20; // Number of users per page
  let page = req.query.page || 1;

  User.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, users) => {
      User.countDocuments((err, count) => {
        if (err) return next(err);
        res.send(users);
      });
    });
});

router.get("/:id", async (req, res, next) => {
  try{
    if (!req.params.id) return res.redirect('/');

    const user = await User.find({ _id: req.params.id });
    res.send(user);
    
  } catch (error) {
    next(error);
  }
})

router.get('/create', (req, res) => {
  res.send('Create user page');
})

router.post("/", (req, res, next) => {
  try {
    const {
      fullname,
      username,
      password,
      confirmPassword,
      email,
      phone
    } = req.body;
    if (password !== confirmPassword) {
      req.flash('error', 'Confirm-password does not match!');
      res.redirect('/');
    } else {
      const checkExist = findAdminUser({username, email, password})
    }
  } catch (error) {
    next(error)
  }
})

function findAdminUser({ username, email, phone }) {
  return User.findOne({
    $and: [
      {
        $or: [
          { username: username},
          { email: email},
          { phoneNumber: phone},
        ]
      },
      { userRight: 'admin' },
    ]
  });
}




module.exports = router;
