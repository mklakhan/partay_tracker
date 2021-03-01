$(document).ready(() => {
    // This file just does a GET request to figure out which user is logged in
    const attendBtn = $(".attend");
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
        $(".member-name").text((data.first_name) + " " + (data.last_name));
    });

    attendBtn.on("click", event => {
        // event.preventDefault();
        const attendData = {
            attending: true,
            partay_id: event.target.value
            // user_id: user.id
        };

        // attendPartay(attendData.attending, attendData.partay_id, attendData.user_id);
        attendPartay(attendData.attending, attendData.partay_id);
        console.log(attendData)
    });

    function attendPartay(attending, partay_id) {

        // $.get("/api/attends")
        //     .then((redirectURL) => {
        //         console.log(redirectURL)
        //         window.location = redirectURL;
        //     })
        //     .catch(err => {
        //         throw err
        //     });

        $.post("/api/attends", {
            attending: attending,
            partay_id: partay_id
        })
            .then((redirectURL) => {
                console.log(redirectURL)
                window.location = redirectURL;
            })
            .catch(err => {
                throw err
            });
    }
});