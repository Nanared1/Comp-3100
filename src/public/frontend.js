
$(function() {

    $("#signup").click(function () { 
        
        const username = $("#username").val();
        const firstName = $("#fName").val();
        const lastName = $("#lName").val();
        const password = $("#password").val();
        const confirmPassword = $("#confirm-password").val();

        if(username.length < 5) {
            alert("Username must be 5 letters or more");
            return;
        }

        if((firstName.length < 1) || (lastName.length < 1)) {
            alert("Last Name or First Name is empty.")
            return;
        }

        if(password.length < 1) {
            alert("Password is empty")
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        $.ajax({
            type: "POST",
            url: "/api/user/signup",
            data: JSON.stringify({
                email: username,
                username,
                password,
                name: {
                    first: firstName,
                    last: lastName
                }
            }),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                console.log(response);
                alert("successfully signed up");
                window.location.href = "/index.html";
            },
            error: function (err) {
                console.error("Signup Error: ", err);
                alert("an error occured, please try again!");
            }
        });

    });
    
    $("#login").click(function () { 
        
        const username = $("#username").val();
        const password = $("#password").val();

        if(username.length < 5) {
            alert("Username must be 5 letters or more");
            return;
        }

        if(password.length < 1) {
            alert("Password is empty")
            return;
        }

        $.ajax({
            type: "POST",
            url: "/api/user/login",
            data: JSON.stringify({
                email: username,
                password,
            }),
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                console.log(response);
                localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
                window.location.href = "/views/home.html";
            },
            error: function (err) {
                console.error("Login Error: ", err);
                alert("an error occured, please try again!");
            }
        });

    });


    // get logged in user from local storage
    function getLoggedInUser() {
        return localStorage.getItem("loggedInUser");
    }

    function logout() {
        clearLocalStorage();
    }

    function clearLocalStorage() {
        localStorage.clear()
    }
});