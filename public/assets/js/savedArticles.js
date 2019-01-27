$(document).ready(() => {

    $("#clear-btn").click(function() {
        $.ajax({
            url: "/clear",
            type: "DELETE"
        })
        .then(res => window.location.reload(false))
        .catch(error => console.log(error));
    });

    $(".edit-note").click(function() {
        let id = $(this).attr("id");
        $.get(`/article/${id}`)
            .then(response => showEditModal(response))
            .catch(error => console.log(error));
    });

    $("#save-note-btn").click(function() {
        let articleId = $(this).attr("_id");
        let note = $("#notes").val();
        $.post(`/article/${articleId}`, {note})
            .then(response => $("#edit-note-modal").modal('hide'))
            .catch(error => console.log(error));
    });

    function showEditModal(article) {
        $("#notes").val(article.note ? article.note.body : '');
        $("#save-note-btn").attr("_id", article._id);
        $("#edit-note-modal").modal('show');
    }
});