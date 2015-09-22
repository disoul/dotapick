app.service('Heroname', function(){
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
});

app.controller('SelectHeroController', ['$scope', 'Heroname',
    function($scope, Heroname) {
        $scope.selectedIndex = 0;
        $scope.next = function(){
            $scope.selectedIndex = Math.min($scope.selectedIndex + 1, 2);
        }
        $scope.previous = function(){
            $scope.selectedIndex = Math.min($scope.selectedIndex - 1, 0);
        }

        $scope.heros = HEROS.heronames.map(function(heroname){
            return {
                imgUrl: Heroname.getImgUrl(heroname),
                name: heroname
            }    
        });
        $scope.scroll = function() {
            if (strScroll == null) {
                console.log('ddd');
                strScroll = new IScroll('ng-scope.md-no-transition.md-active');
            }
        }
    }]);
