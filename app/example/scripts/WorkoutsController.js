angular
  .module('example')
  .controller('WorkoutsController', function($scope, supersonic) {
    $scope.navbarTitle = "Workouts";
    $scope.user = {};
    $scope.goals = [];
    var goals = Parse.Object.extend("Goals");
	var query = new Parse.Query(goals);
	query.equalTo("userid", "mX6kUboBzf");
	query.find({
		   success: function(results) {
		   	 supersonic.logger.log(angular.toJson(results));
		     for (var i = 0; i < results.length; i++){
		     	var title = results[i].get("rewardname");
		     	tempreward = {};
		     	tempreward.goaltitle = title;
		     	tempreward.id = i;
		     	tempreward.objectid = results[i].id;
		     	$scope.goals.push(tempreward);
		     }
		     $scope.selected =$scope.goals[0];

		 },
		  error: function(error) {
		  
		  }
		 });

    $scope.submitNewWorkout = function() {
    	var Workout = Parse.Object.extend("Workouts");
	    var workout = new Workout();

	    workout.set("mileage", $scope.user.newworkout);
	    workout.set("userid", "mX6kUboBzf");
	    var query = new Parse.Query("Goals");
	    var goalindex = $scope.selected.id;
	    var objid = $scope.goals[goalindex].objectid;
	    query.equalTo("objectId", objid);
	    query.find({
		   success: function(results) {
		     var pntr = results[0];
		     workout.set("goal", results[0]);
		     workout.save();
		 },
		  error: function(error) {
		  
		  }
		 });
    };


  });