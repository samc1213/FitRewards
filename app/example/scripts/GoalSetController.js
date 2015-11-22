angular
  .module('example')
  .controller('GoalSetController', function($scope, supersonic, $http) {
    $scope.navbarTitle = "Goal Set!";
    $scope.user = {};
    $scope.amazonitems = [];
    $scope.selectedamazonitem = {};
    $scope.selectedamazonitem.poop = {};
    $scope.user = {checker:false};
    $scope.user = {checker2: false};


   //  $scope.$watch('myVar', function() {
   //     alert('hey, myVar has changed!');
   // });

  $scope.clickee = function(index){
    $scope.sel = false;
    $scope.selectedamazonitem.poop = $scope.amazonitems[index];
    $scope.user.checker = true;

    var modalView = new supersonic.ui.View("example#popup");
    var options = {
      animate: true,
      params: {
        id: $scope.amazonitems[index]
      }
    }

    supersonic.ui.modal.show(modalView, options);

  }

	$scope.searchAmazon = function() {
		supersonic.logger.log("IN searchAmazon");
		var query = $scope.user.amazonquery;
    $scope.amazonitems = [];
    $scope.selectedamazonitem.poop = {};
    $scope.sel = false;
    $scope.user.checker = false;
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
              $scope.sel = true;
              for (var i = 0; i < response.data.length; i++){
                var item = {};
                item.title = response.data[i].title;
                item.image = response.data[i].image;
                // supersonic.logger.log(item.image);
                var fullnum = response.data[i].price;
                // supersonic.logger.log(typeof fullnum);

                var beforenum = fullnum.substring(0, fullnum.length-2);
                // supersonic.logger.log(beforenum);
                var afternum = fullnum.substring(fullnum.length-2);
                // supersonic.logger.log(afternum);

                item.price = "$" + beforenum + "." + afternum;
                // supersonic.logger.log(item.price);
                item.chosen = false;

                item.asin = response.data[i].asin;
                $scope.amazonitems.push(item);
              }
              supersonic.logger.log($scope.amazonitems);
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
