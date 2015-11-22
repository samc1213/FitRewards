angular
  .module('example')
  .controller('InitialController', function($scope, supersonic) {
  	$scope.clickedon = function(){
		supersonic.ui.initialView.dismiss();
	};
  	});