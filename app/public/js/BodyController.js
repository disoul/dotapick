app.controller('BodyController', ['$scope', '$mdSidenav', 
	function($scope, $mdSidenav){
		$scope.openList = function(){ 
			if (!$mdSidenav('left').isOpen())
				$mdSidenav('left').open();
		}
		$scope.closeList = function(){
			if ($mdSidenav('left').isOpen()) {
				$mdSidenav('left').close();
            }
		}

        $scope.updateSuggestHeros = function(){
            $scope.$broadcast('SelectChange');
        }
        
        $scope.options = [{                                                    
            name: 'Time',                                                      
            states: ['Month', 'V6.85'],                                
            userStates: 'V6.85'                                                     
        },{                                                                    
            name: 'Server',                                                    
            states: ['China', 'All'],                                          
            userStates: 'All'                                                     
        },{                                                                    
            name: 'Skill',                                                     
            states: ['All', 'Normal', 'High', 'VeryHigh'],                            
            userStates: 'All'                                                     
        },{
            name: 'Mode',
            states: ['Both', 'Anti', 'Cooperation'],
            userStates: 'Both'
        }];
	}]);
