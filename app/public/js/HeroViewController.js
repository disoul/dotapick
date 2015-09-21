app.controller('HeroViewController', ['$scope', 
    function($scope){
        $scope.enemys = [1, 2, 3, 4, 5].map(function(num){
            return {
                id: num,
                imgSrc: './public/image/nohero.jpg',
                name: ''
            };
        });
		$scope.teammates = [1, 2, 3, 4, 5].map(function(num){
			return {
				id: num,
				imgSrc: './public/image/nohero.jpg',
				name: ''
			}
		});
    }]);
