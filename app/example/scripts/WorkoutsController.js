angular
  .module('example')
  .controller('WorkoutsController', function($scope, supersonic) {
  	$scope.bools = {screen1: true, isrunning: false};
  	$scope.bools.showstartrun = true;
  	$scope.bools.finalkillstart = false;
  	$scope.bools.hideBack = true;
  	$scope.bools.youran = false;
    // $scope.navbarTitle = "Workouts";
    $scope.user = {};
    supersonic.ui.views.current.whenVisible( function() {
	$scope.goals = [];
    var goals = Parse.Object.extend("Goals");
	var query = new Parse.Query(goals);
	query.equalTo("userid", "mX6kUboBzf");
	query.notEqualTo("ifRedeemed", true);
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
	});

	$scope.advanceScreen = function(isrunning) {
		$scope.bools.isrunning = isrunning;
		$scope.bools.screen1 = false;
		$scope.bools.hideBack = false;
		if (isrunning == true) {
			$scope.sum = 0;
			$scope.bools.showstartrun = true;
			$scope.bools.finalkillstart = false;
			
			$scope.bools.youran = false;
		}
		else {
			$scope.sum = 0;
			$scope.user.newworkout = null;
		}
	}

	$scope.goBack = function() {
		$scope.bools.screen1 = true;
		$scope.bools.hideBack = true;
		// $scope.sum = 0;
		// $scope.user.workout = 0;
	}
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
		     var goal = results[0];
		     workout.set("goal", goal);
		     workout.save(null, {success: function(workout){
		     	goal.addUnique("workouts", workout);
		     	goal.set("progress", goal.get("progress") + $scope.user.newworkout);
		     	goal.set("remaining", goal.get("remaining") - $scope.user.newworkout);
		     	goal.save(null, {success: function(workout){
		     		$scope.user.newworkout = null;
	    			$scope.selected=$scope.goals[0];
	    			var view = new supersonic.ui.View("example#workouts");
                	// supersonic.ui.layers.push(view); 
	          		supersonic.ui.tabs.select(2);
		     	},
		     	error: function(workout){
		     		supersonic.ui.alert('There was a problem saving your workout :(');
		     	}
		     	} );
		     	
		     },
		     error: function(workout){
		     	supersonic.ui.alert('There was a problem saving your workout :(');
		     }
		 	});
		 },
		  error: function(error) {
		  
		  }
		 });
	    
    };

	
    $scope.startRunning = function() {
		$scope.sum = 0.00;
		$scope.bools.showstartrun = false;
		$scope.bools.hideBack = true;
		var counter = 0;
		var options = {enableHighAccuracy: true};
		stoprunning = supersonic.device.geolocation.watchPosition(options).onValue( function(position) {
			counter += 1;
		  supersonic.logger.log(
		    "Latitude: " + position.coords.latitude + "\n" +
		    "Longitude: " + position.coords.longitude + "\n" +
		    "Timestamp: " + position.timestamp + 
		    "ACC:" + position.coords.accuracy
		  );

		if(!$scope.oldLat || !$scope.oldLon) {
		  	supersonic.logger.log("IF");
		  	$scope.oldLat = position.coords.latitude;
		  	$scope.oldLon = position.coords.longitude;
		  }
		  else {
		  	supersonic.logger.log("ELSE");
	  		
			  var d = distance($scope.oldLat, $scope.oldLon, position.coords.latitude, position.coords.longitude);
			  $scope.oldLat = position.coords.latitude;
			  $scope.oldLon = position.coords.longitude;
			  supersonic.logger.log("D " + d);
			  if (counter > 2) {
			  	$scope.sum += d;
			  }
			  supersonic.logger.log("SUM " + $scope.sum);
			}
		  
		 
		});
	};

	$scope.stopRunning = function() {
		stoprunning();
		$scope.bools.finalkillstart = true;
		$scope.bools.showstartrun = true;
		$scope.bools.hideBack = false;
		$scope.bools.youran = true;
		$scope.user.newworkout = $scope.sum;
		// $scope.sum = 0;
	};
  });
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var radlon1 = Math.PI * lon1/180
	var radlon2 = Math.PI * lon2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
};
