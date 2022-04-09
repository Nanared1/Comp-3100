$(function () {

    const user = JSON.parse(getLoggedInUser());
    if(!getLoggedInUser()) {
        window.location.href = "/index.html";
        alert("User not found, please log in");
    }

    getSelectedArticle()

    function getSelectedArticle() {
        let selectedArticle = JSON.parse(localStorage.getItem("selected_article"));

        if(localStorage.getItem("selected_article")) {
            $("#blog_title").text(selectedArticle.title);
            $("#blog_content").text(selectedArticle.body);
            $("#written_by").text(`${user.name.first} ${user.name.last}`);
            $("#date").text(`${selectedArticle.updated}`);

            getComments(selectedArticle._id);
        }
    }

    function getComments(articleId) {

        $.ajax({
            type: "GET",
            url: `/api/comment/article/${articleId}`,
            success: function (response) {
                const comments = response.data;
                console.log(comments);
                $(".all-comments").empty();
                comments.forEach(comment => {
                    $(".all-comments").append(`
                        <div class="comment-container">
                            <p id="comment-body">${comment.body}</p>
                            <div class="author-date">
                                <span id="comment-author">${user.name.first} ${user.name.last}</span>
                                <span id="comment-date">${comment.updated}</span>
                            </div>
                        </div>
                    `);
                });
            },
            error: function (err) {
                console.error(err);
            }
        });

    }


    $("#blog_save_button").click(function () { 
        
        const title = $("#blog_title_input").val();
        const body = $("#blog_body_input").val();

        if(title.length === 0) {
            alert("title is empty");
            return;
        }

        if(body.length === 0) {
            alert("body is empty");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/api/article/",
            data: JSON.stringify({
                title,
                body,
                author_id: user._id,
                tags: [],
            }),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                console.log(response.data)
                selectedArticle = localStorage.setItem("selected_article", JSON.stringify(response.data));
                getSelectedArticle();
                window.location.href = `view-blog.html`;
            },
            error: function(err) {
                console.error(err);
                alert("An error occured, please try again");
            }
        });
        
    });

    $("#submit-button").click(function () { 
        
        const body = $("#new-comment-input").val();

        if (body.length === 0) {
            alert("comment body is empty!");
            return;
        }

        const selectedArticle = JSON.parse(localStorage.getItem("selected_article"));

        $.ajax({
            type: "POST",
            url: "/api/comment",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                body,
                articleId: selectedArticle._id,
                authorId: user._id
            }),
            success: function (response) {
                getComments(selectedArticle._id);
                $("#new-comment-input").val("");
            },
            error: function(err) {
                console.error(err);
                alert("An error occured, please try again");
            }
        });
        
    });

    // get logged in user from local storage
    function getLoggedInUser() {
        return localStorage.getItem("loggedInUser");
    }
})