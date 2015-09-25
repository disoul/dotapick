app.controller('BodyController', ['$scope', '$mdSidenav', 
	function($scope, $mdSidenav){
		$scope.openList = function(){ 
			if (!$mdSidenav('left').isOpen())
				$mdSidenav('left').open();
		}
		$scope.closeList = function(){
			if ($mdSidenav('left').isOpen())
				$mdSidenav('left').close();
		}
	}]);
