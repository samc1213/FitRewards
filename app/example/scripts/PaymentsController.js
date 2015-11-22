angular
.module('example')
.controller('PaymentsController', function($scope, supersonic, $http, 
    $element) {

    var transform = function(data){
        return $.param(data);
    };

  $http({
  method: 'GET',
  url: 'https://floating-bastion-3464.herokuapp.com/gettoken.php'
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  var clientToken = response.data;
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
             data: {nonce: nonce}
        }).then(function successCallback(response) {
            supersonic.logger.log(response);
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