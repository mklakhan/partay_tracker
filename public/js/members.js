$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  const partayForm = $("form.partay");
  const partay_nameInput = $("input#partay_name-input")
  const partay_summaryInput = $("input#partay_summary-input")
  const partay_dateInput = $("input#partay_date-input");
  const partay_timeInput = $("input#partay_time-input");
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
      partay_time: partay_timeInput.val().trim()
    };

    if (!partayData.partay_name || !partayData.partay_summary || !partayData.partay_date || !partayData.partay_time) {
      return;
    };

    startUpPartay(partayData.partay_name, partayData.partay_summary, partayData.partay_date, partayData.partay_time);
    partay_nameInput.val("");
    partay_summaryInput.val("");
    partay_dateInput.val("");
    partay_timeInput.val("");
  })

  function startUpPartay(partay_name, partay_summary, partay_date, partay_time) {
    $.post("/api/partays", {
      partay_name: partay_name,
      partay_summary: partay_summary,
      partay_date: partay_date,
      partay_time: partay_time
    })
      // .then(() => {
      //   window.location.replace("/members");
      //   // If there's an error, handle it by throwing up a bootstrap alert
      // })
      // .catch(handleLoginErr);
  }
});
