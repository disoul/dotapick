app.controller('ContentController', ['$scope', 
    function($scope){
        $scope.$on('SuggestCall', function(ev, args){
            $scope.$broadcast('ChangeSuggestCall', args);
        }); 
    }]);
