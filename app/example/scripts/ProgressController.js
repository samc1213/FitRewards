angular
  .module('example')
  .controller('ProgressController', function($scope, supersonic) {
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
          supersonic.logger.log("Hello");
          supersonic.ui.dialog.alert("Redeemed your prize!", options).then(function(){
            supersonic.logger.log("Hi");
          $scope.goals[index].set("ifRedeemed", true);
          $scope.goals[index].save();
          })
        };
      });

