var app = angular.module("myApp", ["infinite-scroll", "ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", { controller: "myCtrl", templateUrl: "views/home.html" })
    .when("/query=:id", {
      controller: "myCtrl",
      templateUrl: "views/search.html"
    })
    .otherwise({ redirectTo: "/" });
});

app.controller("myCtrl", function($scope, $http) {
  $scope.users = [];
  $scope.title = "My assignment";

  $http
    .get("https://jsonplaceholder.typicode.com/users")
    .success(function(data) {
      console.log(data);
      $scope.users = data;
    });

  $scope.loadMore = function() {
    $http
      .get("https://jsonplaceholder.typicode.com/users")
      .success(function(data) {
        console.log(data);
        $scope.users.push(...data);
      });
  };

  // End of main controller
});
