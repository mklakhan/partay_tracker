$(document).ready(() => {
    
  // updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });

  $.get("/api/createpartay").then(data => {
      $("#partay-name").text(data.partay_name)
      $("#partay-summary").text(data.partay_summary)
      $("#partay-data").text(data.partay_data)
      $("#partay-time").text(data.partay_time)
  });
});