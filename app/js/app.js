(function() {
  angular.module('patientrec.controllers', []);
  angular.module('patientrec.services', []);

  angular
    .module('patientrec', [
      'ui.router',
      'ui.bootstrap',
      'ngResource',
      'patientrec.controllers',
      'patientrec.services'
    ])
    .config(stateConfig)
    .controller('WindowToolbar', WindowToolbar)
    .factory('Window', function() {
      var gui = require('nw.gui');
      return gui.Window.get();
    })

  stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function stateConfig($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/records");
    //
    // Now set up the states
    $stateProvider

    .state('records', {
      url: "/records",
      templateUrl: "views/records.html",
      controller: 'RecordsController as recordsCtrl',
      resolve: {
        records: function(RecordsDB) {
          return RecordsDB.get(function(data) {
            return data;
          });
        }
      }
    })
      .state('addrecord', {
        url: "/addrecord",
        templateUrl: "views/addRecord.html",
        controller: 'RecordsController as recordsCtrl',
        resolve: {
          records: function(RecordsDB) {
            return RecordsDB.get(function(data) {
              return data;
            });
          }
        }
      });


  }

  WindowToolbar.$inject = ['$scope', 'Window'];

  function WindowToolbar($scope, Window) {
    $scope.windowMinimize = function() {
      Window.minimize();
    };

    $scope.windowToggleFullscreen = function() {
      Window.toggleFullscreen();
    };

    $scope.windowClose = function() {
      Window.close();
    };
  }
})();