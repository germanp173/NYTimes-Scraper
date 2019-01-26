$(document).ready(() => {
    const articlesContainer = $("#articles");
    const maxNumOfArticles = 5;

    $("#scrape-btn").click(() => {
        $.get("/scrape")
            .then(res => renderArticles(res))
            .catch(error => renderError(error));
    });

    $(document).on("click", ".save-btn", function() {
        let card = $(this);
        $.post("/save", {
            headline: card.attr("headline"),
            content: card.attr("content"),
            imageUrl: card.attr("imageUrl"),
            link: card.attr("link")
        })
        .then((response) => {
            if (response.error){
                toggleModal(false);
            } else {
                toggleModal(true);
            }
        })
        .catch(error => toggleModal(false));
    });

    function renderArticles(articles){
        // Ensure we didn't receive any errors from requrest.
        if (articles.error){
            renderError(articles.error);
            return;
        }

        // Clear all articles.
        articlesContainer.empty();

        // Render new articles.
        articles.map((article, i) => {
            if (i >= maxNumOfArticles) return;

            let card = $("<div>").addClass("card");
            let header = $("<div>").addClass("card-header");
            let title = $("<h4>").addClass("card-title")
                                 .append($("<a>")
                                    .attr({
                                        href: article.link,
                                        target: "_blank"
                                    })
                                    .text(article.headline)
                                 );
            header.append(title);
            card.append(header);

            let body = $("<div>").addClass("card-body");
            let content = $("<p>").addClass("card-text").text(article.content);
            let image = $("<img>").attr({
                src: article.imageUrl,
                alt: "Article Image"
            });
            let saveButton = $("<div>").append($("<a>")
                                            .addClass("btn btn-dark btn-sm save-btn text-white")
                                            .attr({
                                                role: "button",
                                                headline: article.headline,
                                                content: article.content,
                                                imageUrl: article.imageUrl,
                                                link: article.link
                                            })
                                            .text("Save Article")
                                        );
                                        
            body.append(content);
            body.append(image);
            body.append(saveButton);
            card.append(body);
            articlesContainer.append(card);
        });
    }

    function renderError(error){
        articlesContainer.empty();
        articlesContainer.append(`<h1>Error Occurred: ${error}</h1>`);
    }

    function toggleModal(success){
        let modalId = success ? "saveSuccess" : "failSuccess";
        $(`#${modalId}`).modal('show');
    }
});