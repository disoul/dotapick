app.controller('SuggestedViewController', ['$scope', 
    function($scope){
        $scope.herolist = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5].map(function(ele) {
            return {
                name: '',
                imgSrc: './public/image/nohero.jpg'
            }
        });
    }]);
