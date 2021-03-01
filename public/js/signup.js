$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const first_nameInput = $("input#first_name-input")
  const last_nameInput = $("input#last_name-input")
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // const confettiElement = $('my-canvas');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      first_name: first_nameInput.val().trim(),
      last_name: last_nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.first_name || !userData.last_name || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.first_name, userData.last_name, userData.email, userData.password);
    first_nameInput.val("");
    last_nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(first_name, last_name, email, password) {
    $.post("/api/signup", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/home");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch((handleLoginErr) => {
        console.log('handleLoginErr', handleLoginErr)
      });
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

let animation = anime({
  targets: '.letter',
  opacity: 1,
  translateY: 50, 
  rotate: {
    value: 360,
    duration: 2000,
    easing: 'easeInExpo'
  }, 
  scale: anime.stagger([0.7, 1], {from: 'center'}), 
  delay: anime.stagger(100, {start: 1000}), 
  translateX: [-10, 30]
}); 

let animationOne = anime({
  targets: '.letter-one',
  opacity: 1,
  translateX: -50,
  delay: anime.stagger(100)
 
});

