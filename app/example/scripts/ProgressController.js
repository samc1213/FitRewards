angular
  .module('example')
  .controller('ProgressController', function($scope, supersonic) {
    $scope.navbarTitle = "Progress";
    $scope.user = {};
    $scope.user.progress = 0;

    supersonic.ui.views.current.whenVisible( function() {
	 // supersonic.ui.alert("This view is now visible");
	 $scope.user.currentgoal = 21;
	  
	});

  //   supersonic.ui.views.current.whenVisible(function() {
  //   	supersonic.ui.alert('yoyo!');
		// // var GameScore = Parse.Object.extend("Goals");
		// // var query = new Parse.Query(GameScore);
		// // query.equalTo("userid", "mX6kUboBzf");
		// // query.find({
		// //   success: function(results) {
		// //     // alert("Successfully retrieved " + results.length + " scores.");
		// //     // Do something with the returned Parse.Object values
		// //     $scope.user.currentgoal = results.length;
		// //     // for (var i = 0; i < results.length; i++) {
		// //     //   var object = results[i];
		// //     //   alert(object.id + ' - ' + object.get('playerName'));
		// //     // }
		// //   },
		// //   error: function(error) {
		// //     // alert("Error: " + error.code + " " + error.message);
		// //   }
		// // });
  //   });

 // 	var stopListening = supersonic.ui.views.current.whenVisible( function() {
	//  supersonic.ui.alert("This view is now visible");
	//  stopListening();
	//});
    
  });
