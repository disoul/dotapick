app.controller('SuggestedViewController', ['$scope', 
    function($scope){
        $scope.herolist = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(function(ele) {
            return {
                name: '',
                imgSrc: './public/image/nohero.jpg'
            }
        });
    }]);
