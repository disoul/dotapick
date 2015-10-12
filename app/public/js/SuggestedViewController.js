app.controller('SuggestedViewController', ['$scope', '$Hero',
    function($scope, $Hero){
        $scope.herolist = range(20, 1).map(function(ele) {
            return {
                id: ele,
                name: '',
                imgSrc: './public/image/nohero.jpg'
            }
        });
        $scope.update = function(suggest) {
            for (var i = 0;i < 20;i++) {
                $scope.herolist[i].name = suggest[i];
                $scope.herolist[i].imgSrc = $Hero.getImgUrl(suggest[i]);
            }
        };
        $scope.$on('ChangeSuggestCall', function(ev, suggest){
            $scope.update(suggest);
        });
    }]);
