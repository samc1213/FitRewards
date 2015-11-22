angular
  .module('example')
  .controller('GoalSetController', function($scope, supersonic, $http) {
    $scope.navbarTitle = "Goal Set!";
    $scope.user = {};

   //  $scope.$watch('myVar', function() {
   //     alert('hey, myVar has changed!');
   // });

	$scope.searchAmazon = function() {
		supersonic.logger.log("IN searchAmazon");
		var query = $scope.user.amazonquery;

		$http({
            method: 'POST',
            url: 'https://floating-bastion-3464.herokuapp.com/amazon.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
             },
	        data: {keyword: query}
	        }).then(function successCallback(response) {
	            supersonic.logger.log("response " + response.data);
	        }, function errorCallback(response) {
	            supersonic.logger.log(response);
	        });
      };

    $scope.submitNewMileageGoal = function() {
    	var MileageGoal = Parse.Object.extend("Goals");
	    var mileageGoal = new MileageGoal();

	    mileageGoal.set("mileage", $scope.user.mileagegoal);
	    mileageGoal.set("userid", "mX6kUboBzf");
	    mileageGoal.set("remaining",$scope.user.mileagegoal);
        mileageGoal.set("workouts", []); 
        mileageGoal.set("ifRedeemed",false); 
       // mileageGoal.set("deadline", $scope.user.deadline); 
        // mileageGoal.set("rewardname", $scope.user.desireditem); 
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
