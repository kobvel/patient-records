/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function() {
  angular
    .module('patientrec.controllers')
    .controller('PrintController', PrintController);

  PrintController.$inject = ['$scope'];

  function PrintController($scope) {
    var self = this;
    var local = window.localStorage;
    self.print = {
      name: '',
      birth: null,
      department: '',
      date: '',
      doctor: '',
      inspects: ''
    }


    window.addEventListener("storage", getRecords, false);

    function getRecords() {
      self.print.name = local.name;
      self.print.birth = local.birth;
      self.print.department = local.department;
      self.print.date = local.date;
      self.print.doctor = local.doctor;
      self.print.inspects = local.inspects;
      console.log(self.print);
      $scope.$apply();
      //document.getElementById('preview').contentDocument.location.reload(true);
    }

  }


})();