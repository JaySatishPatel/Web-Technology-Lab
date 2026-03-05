var app = angular.module("registrationApp", ["ngRoute"]);

app.config(function($routeProvider) {

    $routeProvider
        .when("/register", {
            templateUrl: "views/register.html",
            controller: "RegisterController"
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "LoginController"
        })
        .otherwise({
            redirectTo: "/login"
        });

});


// Register Controller
app.controller("RegisterController", function($scope, $location) {

    $scope.registerUser = function() {

        var user = {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration Successful!");
        $location.path("/login");
    };

});


// Login Controller
app.controller("LoginController", function($scope, $location) {

    $scope.loginUser = function() {

        var storedUser = JSON.parse(localStorage.getItem("user"));

        if(storedUser &&
           storedUser.email === $scope.email &&
           storedUser.password === $scope.password) {

            alert("Login Successful!");
        } else {
            alert("Invalid Email or Password");
        }
    };

});