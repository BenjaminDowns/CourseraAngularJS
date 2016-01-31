'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

  $scope.dishes = menuFactory.getDishes();

  $scope.tab = 1;

  $scope.filtText = '';

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
    return $scope.tab === checkTab;
  };

  $scope.showDetails = false;

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails
  }
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
  }]
  $scope.channels = channels;
  $scope.validChannelSelection = false;
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
      $scope.feedbackForm.$setPristine();
      console.log($scope.feedback);

    }
  };
}])


.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
  var dish = menuFactory.getDish(parseInt($stateParams.id, 10));
  $scope.dish = dish;
}])


.controller("DishCommentController", ["$scope", function($scope) {

  $scope.newComments = []

  $scope.comment = {
    name: "",
    rating: 5,
    comment: "",
    date: ""
  };

  $scope.submitComment = function() {
    var newComment = {
      rating: $scope.comment.rating,
      author: $scope.comment.name,
      comment: $scope.comment.comment,
      date: new Date().toISOString()
    }
    $scope.newComments.push(newComment)
      // reset the model and view (form) data
    $scope.comment = {
      name: "",
      rating: 5,
      comment: "",
      date: ""
    };
    $scope.commentForm.$setPristine();
  };
}]);