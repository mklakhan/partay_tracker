$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  const partayForm = $("form.partay");
  const partay_nameInput = $("input#partay_name-input")
  const partay_summaryInput = $("input#partay_summary-input")
  const partay_dateInput = $("input#partay_date-input");
  const partay_timeInput = $("input#partay_time-input");
  const partay_locationInput = $("input#partay_location-input");
  const partay_imageInput = $("input#partay_image-input");
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  partayForm.on("submit", event => {
    event.preventDefault();
    const partayData = {
      partay_name: partay_nameInput.val().trim(),
      partay_summary: partay_summaryInput.val().trim(),
      partay_date: partay_dateInput.val().trim(),
      partay_time: partay_timeInput.val().trim(),
      partay_location: partay_locationInput.val().trim(),
      partay_image: partay_imageInput.val().trim()
    };

    if (!partayData.partay_name || !partayData.partay_summary || !partayData.partay_date || !partayData.partay_time || !partayData.partay_location || !partayData.partay_image) {
      return;
    };

    createPartay(partayData.partay_name, partayData.partay_summary, partayData.partay_date, partayData.partay_time, partayData.partay_location, partayData.partay_image);
    partay_nameInput.val("");
    partay_summaryInput.val("");
    partay_dateInput.val("");
    partay_timeInput.val("");
    partay_locationInput.val("");
    partay_imageInput.val("");
  })

  function createPartay(partay_name, partay_summary, partay_date, partay_time, partay_location, partay_image) {
    $.post("/api/partays", {
      partay_name: partay_name,
      partay_summary: partay_summary,
      partay_date: partay_date,
      partay_time: partay_time,
      partay_location: partay_location,
      partay_image: partay_image
    })
      .then((redirectURL) => {
        console.log(redirectURL)
        window.location = redirectURL
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(err => {
        throw err
      });
  }
});
