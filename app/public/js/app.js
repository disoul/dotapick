var app = angular.module('dotapick',['ngMaterial']);
app.controller('ListController', function($scope, $mdSidenav){
	$scope.openList = function(){
		$mdSidenav('left').toggle();
	}
});
