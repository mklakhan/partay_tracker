// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

//for email via nodemailer
const {transporter, emailData} = require("../util/nodetransport");

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
    // console.log(req.body);
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        // for email via nodemailer
         transporter.sendMail( emailData (req.body.email, "🎉 Get Ready to Partay!🎉", "Welcome to Partay Tracker! You can now keep track of all the events organized by your squad! 🥳"), (err, info) => {
          if (err) {
            console.log(err)
          } else {
            console.log(`email sent: ${info.response}`)
          }
        });
        // res.redirect(307, "/api/login");
      })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(err)
        res.status(401).json({error: 'This user already exists.'});
      });
  });

  app.post("/api/attends", (req,res) => {
    db.Attend.create({
      attending: req.body.attending,
      partay_id: req.body.partay_id,
      user_id: req.body.user_id
    })
    .then((attendingData) => {
      const a = attendingData.get({plain: true});
      console.log(a)
      res.send(`/partays/${a.partay_id}`)
    })
    .catch(err => {
      res.status(401).json(err);
    });
  });

  app.post("/api/partays", (req, res) => {
    // console.log(req.user)
    // console.log(req.user.id)
    // console.log(req.body)

    db.Partay.create({
      partay_name: req.body.partay_name,
      partay_summary: req.body.partay_summary,
      partay_date: req.body.partay_date,
      partay_time: req.body.partay_time,
      partay_location: req.body.partay_location,
      partay_image: req.body.partay_image,
      host_user_id: req.user.id
    })
      .then((newPartay) => {
        // console.log('newPartay', newPartay)
        const p = newPartay.get({ plain: true });
        // const allEmails = db.User.findAll({
        //   attributes: ['email']
        // })
        // .then((data) => {
        //   console.log('email:', data[0].User)
        // })
        // console.log('allEmails', allEmails)
        let msg = `A new partay has been added by ${req.user.first_name}! The event is called ${req.body.partay_name} and is happening on ${req.body.partay_date} at ${req.body.partay_time} and located at ${req.body.partay_location}! Hope to see you there! 🥳`

        transporter.sendMail(emailData(req.user.email, "🎉 Join the Partay! 🎉!", msg), (err, info) => {
          if (err) {
            // console.log(err)
          } else {
            // console.log(`email sent: ${info.response}`);
            // console.log('results', results)
            return results
          }
        });

        res.send(`/partays/${p.id}`);
      })
      .catch(err => {
        res.status(401).json(err);
      });
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