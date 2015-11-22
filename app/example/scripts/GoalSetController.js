angular
  .module('example')
  .controller('GoalSetController', function($scope, supersonic) {
    $scope.navbarTitle = "Goal Set!";
    $scope.user = {};
    

    $scope.submitNewMileageGoal = function() {
    	var MileageGoal = Parse.Object.extend("Goals");
	    var mileageGoal = new MileageGoal();

	    mileageGoal.set("mileage", $scope.user.mileagegoal);
	    mileageGoal.set("userid", "mX6kUboBzf");
	    mileageGoal.set("remaining",$scope.user.mileagegoal);
        mileageGoal.set("workouts", []); 
        mileageGoal.set("ifRedeemed",false); 
       // mileageGoal.set("deadline", $scope.user.deadline); 
        mileageGoal.set("rewardlink", $scope.user.link); 
        mileageGoal.set("rewardname", $scope.user.desireditem); 
	    mileageGoal.save(null, {
	        success: function(goal) {
	        var view = new supersonic.ui.View("example#goalset");
                supersonic.ui.layers.push(view); 
	          supersonic.ui.tabs.select(2); 
	        },
	        error: function(goal, error) {
	          // Execute any logic that should take place if the save fails.
	          // error is a Parse.Error with an error code and message.
	          // supersonic.ui.dialog.alert('Sorry, there was a problem.');
	        }

	      });
    };
  });
