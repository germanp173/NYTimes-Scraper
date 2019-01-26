$(document).ready(() => {

    $("#clear-btn").click(function() {
        $.ajax({
            url: "/clear",
            type: "DELETE"
        })
        .then(res => window.location.reload(false))
        .catch(error => console.log(error));
    });

});