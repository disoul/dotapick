app.service('$Hero', function(){
    var self = this;
    this.getImgUrl = function(name) {
        var url = 'http://www.dota2.com.cn/images/heroes/';
        if (HeroToImg[name] != undefined) {
            return url + HeroToImg[name] + '_hphover.png';
        }
        name = name.toLowerCase();
        for (var i = 0; i < name.length; i++) {
            if (name[i] == ' '){
                url = url + '_';
                continue;
            }
            url = url + name[i]
        }
        return url + '_hphover.png';
    };


    this.getSelect = function(options) {
        select = options.map(function(option){
            return option.userStates.substr(0,1).toLowerCase();
        }).join("");

    };
}

app.controller('SelectHeroController', ['$scope', '$Hero',
    function($scope, $Hero) {
        $scope.selectedIndex = 0;
        $scope.next = function(){
            $scope.selectedIndex = Math.min($scope.selectedIndex + 1, 2);
        }
        $scope.previous = function(){
            $scope.selectedIndex = Math.max($scope.selectedIndex - 1, 0);
        }

        $scope.heros = HEROS.heronames.map(function(heroname){
            return {
                imgUrl: $Hero.getImgUrl(heroname),
                name: heroname
            }    
        });

    }]);
