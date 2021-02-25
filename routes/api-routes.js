// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body)
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  
  app.post("/api/partays", (req, res) => {
    console.log(req.user)
    // console.log("api_members_id" + req.body)
    //  const user = db.User.findOne({
    //    where: {id:req.params.id}
    //  }).then(() => {
    // console.log(req.body.partay_name);
    //   const Partay = db.Partay.create({
    //     partay_name: req.body.partay_name,
    //     partay_summary: req.body.partay_summary,
    //     partay_date: req.body.partay_date,
    //     partay_time: req.body.partay_time
    //   });
    //   console.log("addUser");
    //   Partay.setUser(user);
    //  });
      // .then(() => {
      //   console.log(res.json(db.User))
      //   // res.redirect(307, "/api/login");
      // })
      // .catch(err => {
      //   res.status(401).json(err);
      // });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
