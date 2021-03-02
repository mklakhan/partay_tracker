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
    db.Partay.findAll({
      raw: true
    }).then(partayData => {
      res.render('home', {
        user: req.user,
        partayData: partayData
      })
    }).catch(err => {
      throw err;
    })
  });


  app.get("/createpartay", isAuthenticated, (req, res) => {
    res.render('createpartay', {
      user: req.user
    })
  });

  // app.get("/partays/:id", isAuthenticated, (req, res) => {
  //   const partayId = req.params.id;
  //   db.Partay.findOne({
  //     raw: true,
  //     where: {
  //       id: partayId
  //     }
  //   })
  //     .then(data => {
  //       res.render('partay', {
  //         user: req.user,
  //         partayData: data
  //       });
  //   })
  //     .catch(err => {
  //     throw err;
  //   });
  // });

  app.get("/partays/:id", isAuthenticated, (req, res) => {
    const partayId = req.params.id
    db.Attend.findAll({
      raw: true,
      where: {
        partay_id: partayId
      },
      include: [db.Partay, db.User]
    })
      .then(data => {
        console.log(data)
        res.render('partay', {
          user: req.user,
          partay_name: data[0]['Partay.partay_name'],
          partay_summary: data[0]['Partay.partay_summary'],
          partay_date: data[0]['Partay.partay_date'],
          partay_time: data[0]['Partay.partay_time'],
          partay_location: data[0]['Partay.partay_location'],
          partay_image: data[0]['Partay.partay_image'],
          partayData: data.map(attendee => {return {
            name: attendee["User.first_name"] + " " + attendee["User.last_name"]
          }})
        });
      })
      .catch(err => {
        throw err;
      })
  })
};
