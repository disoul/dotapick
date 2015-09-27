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


    this.suggest = function(enemys, teammates, options) {
        var suggest = {
            list: [],
            minWinrate: 0
        };
		var getWinrate = function(hero1, hero2) {
			var key = hero1 + '_' + hero2;

            select = options.map(function(option){
                return option.userStates.substr(0,1).toLowerCase();
            }).join("");

			if (winrate[select][key] != undefined) {
				return parseFloat(winrate[select][key]); 
			}else {
				key = hero2 + '_' + hero1;
				return 0 - parseFloat(winrate[select][key]);
			}
		};

        function saveSuggestList(name, winrate) {
            if (suggest.list[0]['winrate'] > suggest.list[1]['winrate']) {
                var mmin = 0;
                var min = 1;
            }else {
                var min = 0;
                var mmin = 1;
            }
            suggest.list.push({'name': name, 'winrate': winrate});
            for (var i = 2;i < suggest.list.length;i++) {
                if (suggest.list[i]['winrate'] < suggest.list[min]['winrate']) {
                    mmin = min;
                    min = i;
                }
            }
            suggest.list.splice(min,1);
            suggest.minWinrate = suggest.list[mmin]['winrate'];
        }

        HEROS.heronames.forEach(function(heroname){
            if ((enemys.indexOf(heroname) == -1) && (teammates.indexOf(heroname) == -1)) {
                var herowinrate = 0;
                enemys.forEach(function(enemy){
                    if (enemy == '') return;
                    herowinrate += getWinrate(heroname, enemy);
                });

                if (suggest.list.length < 20) {
                    suggest.list.push({'name': heroname, 'winrate': herowinrate});
				}else if (suggest.minWinrate < herowinrate) {
					saveSuggestList(heroname, herowinrate);
				}
            }  
        });
		return suggest.list.sort(function(a, b) {
			if (a.winrate > b.winrate) {
				return -1;
			}
			if (a.winrate < b.winrate) {
				return 1;
			}
			return 0;
		});
    }

});

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
