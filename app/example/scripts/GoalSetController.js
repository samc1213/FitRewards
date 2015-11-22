angular
  .module('example')
  .controller('GoalSetController', function($scope, supersonic, $http, $element) {
    $scope.navbarTitle = "Goal Set!";
    $scope.user = {};
    $scope.amazonitems = [];
    $scope.selectedamazonitem = {};
    $scope.selectedamazonitem.poop = {};
    $scope.user = {checker:false, currentlypaying:false, milevamazon:false};


   //  $scope.$watch('myVar', function() {
   //     alert('hey, myVar has changed!');
   // });

  $scope.clickee = function(index){
    $scope.sel = false;
    $scope.selectedamazonitem.poop = $scope.amazonitems[index];
    $scope.user.checker = true;
    $scope.user.currentlypaying = true;
    $scope.navbarTitle = "Payment";

    // var modalView = new supersonic.ui.View("example#popup");
    // var options = {
    //   animate: true
    // };

    // supersonic.data.channel('events').publish($scope.amazonitems[index]);
    
    


    // supersonic.ui.modal.show(modalView, options);

  }

	$scope.searchAmazon = function(query) {
		supersonic.logger.log("IN searchAmazon");
		var query = query;
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
                item.priceval = fullnum;
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
      mileageGoal.set("rewardname", $scope.selectedamazonitem.poop.title);
      mileageGoal.set("price", $scope.selectedamazonitem.poop.price);
      mileageGoal.set("image", $scope.selectedamazonitem.poop.image);
      mileageGoal.set("asin", $scope.selectedamazonitem.poop.asin);
      mileageGoal.set("progress", 0);
        mileageGoal.set("workouts", []); 
        mileageGoal.set("ifRedeemed",false); 
       // mileageGoal.set("deadline", $scope.user.deadline); 
        // mileageGoal.set("rewardname", $scope.user.desireditem); 
	    mileageGoal.save(null, {
	        success: function(goal) {
	        var view = new supersonic.ui.View("example#goalset");
                // supersonic.ui.layers.push(view); 
	          supersonic.ui.tabs.select(2); 
	        },
	        error: function(goal, error) {
	          // Execute any logic that should take place if the save fails.
	          // error is a Parse.Error with an error code and message.
	          // supersonic.ui.dialog.alert('Sorry, there was a problem.');
	        }

	      });
    };

    $scope.goBack = function(){
      $scope.user.currentlypaying = false;
      $scope.user.checker = false;
      $scope.sel = true;
    };

    $http({
      method: 'GET',
      url: 'https://floating-bastion-3464.herokuapp.com/gettoken.php'
      }).then(function successCallback(response) {
      supersonic.logger.log("hello");
        // this callback will be called asynchronously
        // when the response is available
      var clientToken = response.data;
      supersonic.logger.log(clientToken);
       braintree.setup(
        // Replace this with a client token from your server
        clientToken,
        "dropin", {
        container: "payment-form",
        paymentMethodNonceReceived: function (event, nonce) {
             $http({
                 method: 'POST',
                 url: 'https://floating-bastion-3464.herokuapp.com/postnonce.php',
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                 transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                 },
                 data: {nonce: nonce, amount: parseFloat($scope.selectedamazonitem.poop.priceval)/100.00}
            }).then(function successCallback(response) {
                supersonic.logger.log(response);
                //var response1 = angular.fromJson(response.data);
                //supersonic.logger.log("amount" + angular.toJson(response1)[0]);
                supersonic.logger.log("response " + response.data.amount);
                supersonic.logger.log("status " + response.data.status);
                if (response.data.status == "authorized") {
                  supersonic.ui.dialog.alert('Payment of $' + response.data.amount + ' accepted!');
                  $scope.user.currentlypaying = false;
                  $scope.user.milevamazon = true;
                }
                else {
                  supersonic.ui.dialog.alert('Rejected. Try again later.');
                }
            }, function errorCallback(response) {
                supersonic.logger.log(response);

            });
          }
        });
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      supersonic.logger.log(response);
  });
  });
