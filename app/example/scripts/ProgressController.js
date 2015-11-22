angular
  .module('example')
  .controller('ProgressController', function($scope, supersonic) {
    $scope.navbarTitle = "Progress";

        supersonic.ui.views.current.whenVisible(function() {
            
          var GameScore = Parse.Object.extend("Goals");
		  var query = new Parse.Query(GameScore);
		 query.equalTo("userid", "mX6kUboBzf");
        query.ascending("remaining"); 
        query.include("workouts"); 
		 query.find({
		   success: function(results) {
               supersonic.logger.log("got goals"); 
            $scope.goals = results; 
		 },
		  error: function(error) {
		  
		  }
		 });
  });
      });

