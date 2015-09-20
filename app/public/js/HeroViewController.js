app.controller('HeroViewController', ['$scope', 
    function($scope){
        $scope.enemys = [1,2,3,4,5].map(function(num){
            return {
                id: num,
                imgSrc: 'http://www.dota2.com.cn/images/heroes/antimage_hphover.png',
                name: ''
            };
        });
    }]);
