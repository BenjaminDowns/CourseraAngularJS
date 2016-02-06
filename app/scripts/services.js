'use strict';

angular.module('confusionApp')

.constant("baseURL", "http://localhost:3000/")


.service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  this.getDishes = function() {
    return $resource(baseURL + 'dishes/:id', null, {
      'update': {
        method: 'PUT'
      }
    });
  };

  this.getPromotion = function() {
    return $resource(baseURL + 'promotions/0')
  }


}])

.service('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  this.getLeaders = function() {
    return $resource(baseURL + "leadership/")
  }

  this.getLeader = function() {
    return $resource(baseURL + "leadership/3")
  }

}])


.service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
    return $resource(baseURL + 'feedback')

}]);