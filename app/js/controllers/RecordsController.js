/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function() {
  angular
    .module('patientrec.controllers')
    .controller('RecordsController', RecordsController);

  RecordsController.$inject = ['RecordsDB', 'records', '$scope', '$filter'];

  function RecordsController(RecordsDB, records, $scope, $filter) {
    var self = this;

    self.firstForm = {};

    self.records = records;
    self.inspectSelected = 'шлунок';

    var newRecord = {
      name: '',
      surname: '',
      middlename: '',
      birth: '',
      department: '',
      doctor: '',
      inspections: [],
      type: '',
      date: ''
    };

    function getInspects() {
      if (self.inspectSelected === 'серце') {
        self.newRecord.inspections.push('серце');
      } else if (self.abdominal.stomach.bool) {
        self.newRecord.inspections.push('ОЧВ');
      } else {
        for (Key in self.abdominal) {
          if (self.abdominal[Key].bool) {
            self.newRecord.inspections.push(self.abdominal[Key].value);
          }
        }
      }
    };
    self.newRecord = angular.copy(newRecord);
    $scope.today = function() {
      self.newRecord.date = new Date();
    };
    $scope.today();

    self.submit = function() {
      var bool = true;
      for (Key in self.newRecord) {
        bool = bool && self.newRecord[Key];
      }
      return bool;
    };

    self.add = function() {
      getInspects();
      var input = angular.copy(self.newRecord);
      self.firstForm.$setPristine();
      self.firstForm.$setUntouched();

      RecordsDB.add(input, function(data) {
        self.newRecord = angular.copy(newRecord);
        self.records.unshift(data);
      });
    };

    self.delete = function(record) {
      RecordsDB.delete({
        id: record._id
      }, function() {
        self.records.splice(self.records.indexOf(record), 1);
      });
    };
    self.abdominal = {
      kidneys: {
        bool: false,
        value: 'нирки'
      },
      bladder: {
        bool: false,
        value: 'сеч.міхур'
      },
      gynecology: {
        bool: false,
        value: 'гінекологія'
      },
      stomach: {
        bool: false,
        value: 'ОЧВ'
      }
    };
    self.departments = [
      'Кардіологія',
      'Терапія',
      'Урологія',
      'Стоматолог'
    ];
    self.inspect = [
      'шлунок',
      'серце'
    ];
    self.doctors = [
      'Гордеева Тетьяна Олександрівна',
      'Русева Наталія Миколаївна',
      'Фесенко Сергій Олександрович',
      'Киценко Віталій Олегович'
    ];
  }
})();