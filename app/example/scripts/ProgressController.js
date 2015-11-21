angular
  .module('example')
  .controller('ProgressController', function($scope, supersonic) {
    $scope.navbarTitle = "Progress";
    $scope.user = {};
    $scope.user.progress = 0;

        supersonic.ui.views.current.whenVisible(function() {
          var GameScore = Parse.Object.extend("Goals");
		  var query = new Parse.Query(GameScore);
		 query.equalTo("userid", "mX6kUboBzf");
		 query.find({
		   success: function(results) {
		
		     $scope.user.currentgoal = results.length;
		 },
		  error: function(error) {
		  
		  }
		 });
        });
    
  });
