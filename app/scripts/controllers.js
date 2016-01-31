'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  
  $scope.showMenu = false;
  $scope.dishes = {};
  $scope.message = "Loading..."

  menuFactory.getDishes().then(function(response) {
    $scope.dishes = response.data;
    $scope.showMenu = true;
  }, function(response) {
    $scope.message = "Error " + response.status + " " + response.statusText;
  })


  $scope.select = function(setTab) {
    $scope.tab = setTab;

    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } else if (setTab === 3) {
      $scope.filtText = "mains";
    } else if (setTab === 4) {
      $scope.filtText = "dessert";
    } else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function(checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };
}])

.controller('ContactController', ['$scope', function($scope) {

  $scope.feedback = {
    mychannel: "",
    firstName: "",
    lastName: "",
    agree: false,
    email: ""
  };

  var channels = [{
    value: "tel",
    label: "Tel."
  }, {
    value: "Email",
    label: "Email"
  }];

  $scope.channels = channels;
  $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', function($scope) {

  $scope.sendFeedback = function() {

    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
      $scope.invalidChannelSelection = true;
    } else {
      $scope.invalidChannelSelection = false;
      $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
      };
      $scope.feedback.mychannel = "";
      $scope.feedbackForm.$setPristine()
    }
  };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

  $scope.showDish = false;
  $scope.message = "Loading..."
  $scope.dish = {};

  menuFactory.getDish(parseInt($stateParams.id, 10)).then(function(response) {
    $scope.dish = response.data;
    $scope.showDish = true;
  }, function(response) {
    $scope.message = "Error " + response.status + " " + response.statusText
  })

}])

.controller('DishCommentController', ['$scope', function($scope) {

  $scope.mycomment = {
    rating: 5,
    comment: "",
    author: "",
    date: ""
  };

  $scope.submitComment = function() {

    $scope.mycomment.date = new Date().toISOString();

    $scope.dish.comments.push($scope.mycomment);

    $scope.commentForm.$setPristine();

    $scope.mycomment = {
      rating: 5,
      comment: "",
      author: "",
      date: ""
    };
  }
}])

.controller("IndexController", ["$scope", "menuFactory", "corporateFactory", function($scope, menuFactory, corporateFactory) {

  $scope.showDish = false;
  $scope.message = "Loading..."
  $scope.promotion = {}
  // $scope.execChef = {}
  // $scope.featuredDish = {}

  menuFactory.getDish().then(function(response) {
    $scope.featuredDish = response.data
    console.log("successfully loaded from the db")
    $scope.message = "this should not be here"
    $scope.showDish = true;
  }, function(response) {
    $scope.message = "Error " + response.status + " " + response.statusText
  });



  $scope.featuredDish = menuFactory.getPromotion()

  // .then(function(response) {
  //   $scope.promotion = response.data
  //   $scope.showDish = true;
  // }, function(response) {
  //   $scope.message = "Error " + response.status + " " + response.statusText
  // });

  $scope.execChef = corporateFactory.getLeader(3)

  // .then(function(response) {
  //   $scope.execChef = response.data
  // }, function(response) {
  //   $scope.message = "Error " + response.status + " " + response.statusText
  // });

}])

.controller("AboutController", ["$scope", "corporateFactory", function($scope, corporateFactory) {
  $scope.leadership = corporateFactory.getLeaders()
}])

// implement the IndexController and About Controller here


;