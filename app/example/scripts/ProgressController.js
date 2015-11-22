angular
  .module('example')
  .controller('ProgressController', function($scope, supersonic, $http) {
    $scope.navbarTitle = "Progress";


    $scope.round = function(progress){
      return progress.toFixed(2); 
    }
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


        var options = {
          buttonLabel: "close"
        };
        $scope.redeem = function(index){
          
          var name = $scope.goals[index].get("rewardname");
          var miles = $scope.goals[index].get("mileage");
          var img = $scope.goals[index].get("image");
          var body = 'Look ma! I earned myself a ' + name + ' for reaching my goal of running ' + miles + ' miles!';

                  $http({
            method: 'POST',
            url: 'https://floating-bastion-3464.herokuapp.com/twilio.php',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
             },
          data: {to: '+19145845033', body: body, image: img}
          }).then(function successCallback(response) {
              
          }, function errorCallback(response) {
              supersonic.logger.log(response);
          });



          supersonic.logger.log("Hello");
          supersonic.ui.dialog.alert("Redeemed your prize!", options).then(function(){
            supersonic.logger.log("Hi");
          $scope.goals[index].set("ifRedeemed", true);
          $scope.goals[index].save();
          })
        };
      });

