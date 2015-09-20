app.controller('ListController', ['$scope', '$mdSidenav', 
    function($scope, $mdSidenav){
        $scope.openList = function(){
            $mdSidenav('left').toggle();
        }          
    }]);
