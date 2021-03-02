$(document).ready(() => {

    const attendBtn = $(".attend");

    $.get("/api/user_data").then(data => {
        $(".member-name").text((data.first_name)); // + " " + (data.last_name)
    });

    attendBtn.on("click", event => {
        const attendData = {
            attending: true,
            partay_id: event.target.value
        };
        
        attendPartay(attendData.attending, attendData.partay_id);
    });

    function attendPartay(attending, partay_id) {

        $.post("/api/attends", {
            attending: attending,
            partay_id: partay_id
        })
            .then((redirectURL) => {
                console.log(redirectURL)
                window.location = redirectURL;
            })
            .catch(err => {
                console.log(err)
                throw err
            });
    }
});