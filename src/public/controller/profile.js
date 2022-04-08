$(function () {

    if(!getLoggedInUser()) {
        window.location.href = "/index.html";
        alert("User not found, please log in");
    }

    init();

    function init() {
        const user = JSON.parse(getLoggedInUser());

        $("#user_name").text(`${user.name.first} ${user.name.last}`);
        $("#user_email").text(`${user.email}`);
    }

    // get logged in user from local storage
    function getLoggedInUser() {
        return localStorage.getItem("loggedInUser");
    }
});