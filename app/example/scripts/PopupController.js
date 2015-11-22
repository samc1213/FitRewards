angular
  .module('example')
  .controller('PopupController', function($scope, supersonic) {
  	msg = "BOOBIES";
  	$scope.potentialItem = msg;
  	// $scope.sel = false;


  	// var stopListen = supersonic.ui.views.current.params.onValue( function (params){
  	// 	supersonic.logger.log("options " + params.id);
  	// });

  supersonic.data.channel('events').subscribe( function(message, reply) {
  	msg = message.image;
  	$scope.$apply(function() {
  		$scope.potentialItem = msg;
  	});
  	// $scope.potentialItem.image = $scope.potentialItem.image.toString();
  	supersonic.logger.log($scope.potentialItem.image);
  	// $scope.sel = true;

});
  $scope.connection = "WOO";
});