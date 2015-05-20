/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function() {
  angular
    .module('patientrec.controllers')
    .controller('PrintController', PrintController);

  PrintController.$inject = ['NewRecord'];

  function PrintController(NewRecord) {
    var self = this;
    var record = NewRecord.record;
    self.record = record;
    self.getRecords = function() {
      console.log(self.record);
      console.log(NewRecord.num);
    }

  }


})();