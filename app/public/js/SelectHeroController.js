app.controller('SelectHeroController', ['$scope', 
    function($scope) {
        $scope.selectedIndex = 0;
        $scope.next = function(){
            $scope.selectedIndex = Math.min($scope.selectedIndex + 1, 2);
        }
        $scope.previous = function(){
            $scope.selectedIndex = Math.min($scope.selectedIndex - 1, 0);
        }
    }]);
