app.controller('HeroViewController', ['$scope', '$mdDialog', '$Hero', '$http',
    function($scope, $mdDialog, $Hero, $http){
        $scope.enemys = range(5, 1).map(function(num){
            return {
                id: num,
                imgSrc: './public/image/nohero.jpg',
                name: ''
            };
        });
        $scope.teammates = range(5, 6).map(function(num){
            return {
                id: num,
                imgSrc: './public/image/nohero.jpg',
                name: ''
            }
        });
		$scope.getArray = function(objList) {
			var array = new Array(objList.length);
			for (var i = 0;i < array.length;i++) {
				array[i] = objList[i].name
			}
			return array;
		}

        $scope.showHeroDialog = function(ev){
            var id = arguments[0];
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'herodialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                disableParentScroll: false,
                onComplete: goScroll()
            })
            .then(function(answer) {
                if (id < 6) {
                    $scope.enemys[id - 1].imgSrc = answer[0];
                    $scope.enemys[id - 1].name = answer[1];
                }else {
                    $scope.teammates[id - 6].imgSrc = answer[0];
                    $scope.teammates[id - 6].name = answer[1];
                }

                $http.post('/suggest', {
                    enemy: $scope.getArray($scope.enemys),
                    teammate: $scope.getArray($scope.teammates),
                    select: $Hero.getSelect($scope.options)
                }).success(function(data, status, header, config) {
                    $scope.suggestheros = data['hero'];
                    $scope.$emit('SuggestCall',$scope.suggestheros);
                }) 
            }, function(){
                strScroll.destroy();
                strScroll = null;
                agiScroll.destroy();
                agiScroll = null;
                intScroll.destroy();
                intScroll = null;
                //cancel dialog
            });
        };

        $scope.$on('SelectChange',function(){
            console.log('333');
            $http.post('/suggest', {
                enemy: $scope.getArray($scope.enemys),
                teammate: $scope.getArray($scope.teammates),
                select: $Hero.getSelect($scope.options)
            }).success(function(data, status, header, config) {
                $scope.suggestheros = data['hero'];
                $scope.$emit('SuggestCall', $scope.suggestheros);
            }); 
        });

        function DialogController($scope, $mdDialog){
            $scope.hide = function(){
                $mdDialog.hide();
            }
            $scope.cancel = function(){
                $mdDialog.cancel();
            }
            $scope.answer = function(answer){
                $mdDialog.hide(answer);
            }
        }
    }]);
