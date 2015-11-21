angular
  .module('example')
  .controller('WorkoutsController', function($scope, supersonic) {
    $scope.navbarTitle = "Workouts";
    $scope.user = {};

    $scope.submitNewWorkout = function() {
    	var Workout = Parse.Object.extend("Workouts");
	    var workout = new Workout();

	    workout.set("mileage", $scope.user.newworkout);
	    workout.set("userid", "mX6kUboBzf");
	    workout.save(null, {
	        success: function(workout) {
	          // Execute any logic that should take place after the object is saved.
	          // supersonic.ui.dialog.alert('Uploaded photo!');
	        },
	        error: function(workout, error) {
	          // Execute any logic that should take place if the save fails.
	          // error is a Parse.Error with an error code and message.
	          // supersonic.ui.dialog.alert('Sorry, there was a problem.');
	        }

	      });
    };
  });
