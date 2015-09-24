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
                $scope.herolist[i].name = suggest[i].name;
                $scope.herolist[i].imgSrc = $Hero.getImgUrl(suggest[i].name);
            }
        };
        $scope.$on('ChangeSuggestCall', function(ev, suggest){
            console.log(suggest);
            $scope.update(suggest);
        });
    }]);
