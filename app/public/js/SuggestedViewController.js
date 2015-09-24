app.controller('SuggestedViewController', ['$scope', 
    function($scope){
        $scope.herolist = range(20, 1).map(function(ele) {
            return {
                id: ele,
                name: '',
                imgSrc: './public/image/nohero.jpg'
            }
        });
    }]);
