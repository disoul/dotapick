app.controller('OptionsSelectController', ['$scope', 
	function($scope){
		$scope.options = [{
			name: 'Time',
			states: ['Week', 'Month', 'V6.84'],
			userStates: ''
		},{
			name: 'Server',
			states: ['China', 'All'],
			userStates: ''
		},{
			name: 'Skill',
			states: ['Normal', 'High', 'VeryHigh'],
			userStates: ''
		}];
	}]);
