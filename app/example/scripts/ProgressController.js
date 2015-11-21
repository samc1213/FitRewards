angular
  .module('example')
  .controller('ProgressController', function($scope, supersonic) {
    $scope.navbarTitle = "Progress";
    $scope.user = {};
  

        supersonic.ui.views.current.whenVisible(function() {
            supersonic.logger.log("Inside current"); 
            
          var GameScore = Parse.Object.extend("Goals");
		  var query = new Parse.Query(GameScore);
		 query.equalTo("userid", "mX6kUboBzf");
        query.descending("createdAt");
		 query.find({
		   success: function(results) {

		     $scope.user.currentgoal = results[0].get("mileage");
		 },
		  error: function(error) {
		  
		  }
		 });
          
        var workout = Parse.Object.extend("Workouts");
        var workoutQ = new Parse.Query(workout); 
        workoutQ.equalTo("userid", "mX6kUboBzf");
        workoutQ.find({
            success: function(workouts){
                var total = 0;
                for (var i = 0; i < workouts.length; i++){
                    total += workouts[i].get("mileage"); 
                }
                  $scope.user.progress = total; 
            },
            error: function(error){
            }
        });  
        });
    
  });
