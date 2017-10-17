(function() {

  var courses_app = angular.module('courses_module', ['ngAnimate', 'ui.bootstrap']);
  courses_app.controller('featured_courses_controller', function($scope, $http) 
  {
    $http.get(config.featuredCoursesUri)
    .then(function (result) 
    {
      $scope.featured_courses = result.data;
    });
  });
  
  courses_app.controller('all_courses_controller', function($scope, $http) 
  {
    $http.get(config.allCoursesUri)
    .then(function (result) 
    {
      $scope.all_courses = result.data;
      $scope.searched_courses = result.data;
    });

    $scope.searchCourseByName = function(searchText){
      $http.get(config.allCoursesUri + '&courseName=' + searchText)
      .then(function(result){
          $scope.searched_courses = result.data;
      });
    };
  });

})();