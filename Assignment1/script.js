(function () {
  'use strict';
  // app and controller 
  angular.module('app', [])
    .controller('control', con);

  // minify protection//only scope is needed
  con.$injector = ['$scope', '$filter', '$injector'];
  function con($scope, $filter, $injector) {
    // vars
    $scope.message = 'Empty';
    $scope.input = '';
    $scope.textcolor = 'black';
    // button click check items
    $scope.check = function () {
      let input = $scope.input;
      let message = hungry_check(input);
      $scope.message = message
      if (message == 'Enjoy!' || message == 'Too Much!')
      {
        $scope.textcolor = 'green';
      }
      else {
        $scope.textcolor = 'red';
      }
    }
    function hungry_check(items_string) {
      // if '' print error
      items_string = items_string.split(" ").join("")
      const items = items_string.split(',').length ;
      if (items_string == '') {
        return 'Please add items like 1 or 1,2,3';
      }
      else if (items <= 3 && items > 0) {
        return 'Enjoy!';
      }
      else if (items > 3) {
        return 'Too Much!';
      }
      return 'Error!';
      // if 1,2,3 items print enjoy
      // if more than 3 print too much
    }
  }


  //function ($scope) {

  // $scope.name = "";
  // $scope.func = function () {
  //   return '';
  // }
  // $scope.total = 0
  // $scope.displaynumeric = function () {
  //   var total = 0;

  //   $scope.total = calc($scope.name);
  // }




  // function calc(string) {
  //   var i = 0;
  //   for (let str of string) {
  //     i += str.charCodeAt(0)
  //   }
  //   return i;
  // }
  //controller
})();//IIFE
console.log('Done');