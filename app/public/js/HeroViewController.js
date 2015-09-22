app.controller('HeroViewController', ['$scope', '$mdDialog', 
    function($scope, $mdDialog){
        $scope.enemys = [1, 2, 3, 4, 5].map(function(num){
            return {
                id: num,
                imgSrc: './public/image/nohero.jpg',
                name: ''
            };
        });
        $scope.teammates = [6, 7, 8, 9, 10].map(function(num){
            return {
                id: num,
                imgSrc: './public/image/nohero.jpg',
                name: ''
            }
        });

        $scope.showHeroDialog = function(ev, id){
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'herodialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                disableParentScroll: false,
                locals: {heroid: id},
                onComplete: goScroll()
            })
            .then(function(answer) {
                
            }, function(){
                //cancel dialog
            });
        };

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
            $scope.scroll = function() {
                if (strScroll == null)
                    strScroll = new IScroll('#tab-content-15');
            }
        }
    }]);
