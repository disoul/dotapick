var app = angular.module('dotapick',['ngMaterial']);

function range(amout, start) {
    var array = new Array(amout);
    for (var i = 0;i < amout;i++) {
        array[i] = start + i;
    }
    return array;
}
