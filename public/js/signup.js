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
    $("#alert .msg").text(err.responseJSON.error);
    $("#alert").fadeIn(500);
  }
});

let animation = anime({
  targets: '.letter',
  opacity: 1,
  translateY: 25, 
  scale: [
    {value: .1, easing: 'easeOutSine', duration: 500},
    {value: 1, easing: 'easeInOutQuad', duration: 1200}
  ],
  delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
}); 

let animationOne = anime({
  targets: '.letter-one',
  opacity: 1,
  translateX: -50,
  delay: function(el, i) { return i * 450; },
  direction: 'alternate',
  loop: true,
  easing: 'easeInOutSine'
 
});

let animationThree = anime.timeline({loop: false})
.add({
  targets: '.hidden-text',
  scale: [14,1],
  opacity: [0,1],
  easing: "easeOutCirc",
  duration: 800,
  delay: (el, i) => 200 * i
}).add({
  targets: '.hidden-text',
  opacity: 1,
  duration: 1000,
  easing: "easeOutExpo",
  delay: 1000
});


