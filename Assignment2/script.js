(function () {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', tobuy)
    .controller('AlreadyBoughtController', alreadybought)
    .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
    .config(config);
  
  tobuy.$inject = ['$scope','ShoppingListCheckOffService'];
  function tobuy($scope, ShoppingListCheckOffService) {
    var service = ShoppingListCheckOffService;
    $scope.items = service.buy;//list of items
    $scope.error = service.buydisplay;
    $scope.buy = function (index) {
      service.removetobuylist(index)
      $scope.error  = service.buydisplay;
    }
  }
  alreadybought.$inject = ['$scope', 'ShoppingListCheckOffService'];
  function alreadybought($scope, ShoppingListCheckOffService) {
    var service = ShoppingListCheckOffService;
    $scope.items = service.bought;
    $scope.error = service.boughtdisplay;
  }
  function ShoppingListCheckOffServiceProvider() {
    var provider = this;
    provider.defaults = { 'maxItems': 10 ,'buy':[],'bought':[]};
    provider.$get = function () {
      var shoplistservice = new shopservice(provider.defaults.maxItems, provider.defaults.buy, provider.defaults.bought)
      return shoplistservice;
    }
  }
  config.$inject = ['ShoppingListCheckOffServiceProvider'];
  function config(ShoppingListCheckOffServiceProvider) {
    var items = new Array();
    var item1 = new Object();
    item1.name = 'cookies';
    item1.quantity = 10;
    var item2 = new Object();
    item2.name = 'cookies';
    item2.quantity = 10;
    items[0] = item1;
    items[1] = item2;

    var bought = new Array();
    bought[0] = {'quantity':10,'name':'cookies'}
    // ShoppingListCheckOffServiceProvider.defaults.maxItems = 10;
    ShoppingListCheckOffServiceProvider.defaults.buy = items;
    ShoppingListCheckOffServiceProvider.defaults.bought = bought;
    // console.log('config');
  }
  function shopservice(maxItems,buy,bought) {
    var service = this; 
    service.buy = buy
    service.bought = bought;
    service.buydisplay = true;
    service.boughtdisplay = true;
    if (service.buy.length == 0) {
      service.buydisplay = false;
    }
    if (service.bought.length == 0) {
      service.boughtdisplay = false;
    }

    service.addtoalreadyboughtlist = function (obj) {
      service.bought.push(obj)
      service.boughtdisplay = true;
    };
    service.removetobuylist = function (index) {
      service.addtoalreadyboughtlist(service.buy[index])
      service.buy.splice(index, 1)
      if (service.buy.length == 0) {
        service.buydisplay = false;
        // console.log('empty')
      }
    };
    
  }
  
})();//IIFE