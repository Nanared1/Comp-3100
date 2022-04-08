
$(function () {

    if(!getLoggedInUser()) {
        alert("User not found, please log in");
        window.location.href = "/index.html";
    }
    
    const user = JSON.parse(getLoggedInUser());
    let articles = [];

    $.ajax({
        type: "GET",
        url: `/api/article/author/${user._id}`,
        success: function (response) {
            articles = response.data;
            response.data.forEach(article => {
                $(".list-container").append(`
                    <div class="card-container">
                        <a id="${article._id}" class="card-title">${article.title}</a>
                        <span class="card-shallow-body">${article.body}</span>
                        <div class="created-date-container">
                            <span class="card-author">${user.name.first} ${user.name.last}</span>
                            <span class="card-date">${article.updated}</span>
                        </div>
                    </div>
                `);

                $(`#${article._id}`).click(function () { 
                    console.log("clicked")
                    const article_id = $(this).attr("id");
                    const article = articles.find(ar => ar._id === article_id);
                    
                    localStorage.setItem(`selected_article`, JSON.stringify(article));
                    window.location.href = "view-blog.html";
                });
            });
        }
    });

    // get logged in user from local storage
    function getLoggedInUser() {
        return localStorage.getItem("loggedInUser");
    }
});