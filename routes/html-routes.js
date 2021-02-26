// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our models to get data from the database
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the home page
    if (req.user) {
      res.redirect("/home");
    }
    res.render('signup')
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the home page
    if (req.user) {
      res.redirect("/home");
    }
    res.render('login')
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/home", isAuthenticated, (req, res) => {
    console.log(req.user)
    res.render('home', {
      user: req.user
    })
  });
  app.get("/createpartay", (req, res) => {
    res.render('createpartay', {
      user: req.user
    })
  });
  app.get("/partays/:id", (req, res) => {
    const partayId = req.params.id
    db.Partay.findOne({
      raw: true,
      where: {
        id: partayId
      }
    })
      .then(data => {
        // console.log(data)
        res.render('partay', {
          partayData: data
        })
        // console.log({
        //   partayData: data
        // })
      })
      .catch(err => {
        throw err;
      })
  })
};
