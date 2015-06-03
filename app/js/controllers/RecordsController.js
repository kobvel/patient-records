/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function() {
  angular
    .module('patientrec.controllers')
    .controller('RecordsController', RecordsController);

  RecordsController.$inject = ['RecordsDB', 'records', '$scope', '$filter'];

  function RecordsController(RecordsDB, records, $scope, $filter) {
    var self = this;
    self.pdfSrc = null;
    self.firstForm = {};


    self.records = records;
    self.inspectSelected = 'шлунок';
    self.filterTable = null;
    self.filter = {
      department: '',
      doctor: '',
      inspections: '',
      type: '',
      day: '',
      month: ''
    }

    self.setPrintFormSize = function(){    
      var size = screen.height/1.3;
      $('#preview').height(size);
    }
    self.filters = function() {
      console.log(records);
      self.filter = {
        department: '',
        doctor: '',
        inspections: [],
        type: '',
        date: ''
      }
      console.log(records);

    }
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
      self.newRecord.inspections = [];
      if (self.inspectSelected === 'серце') {
        self.newRecord.inspections.push('серце');
        console.log(self.newRecord.inspections);
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

    self.print = function() {
      window.frames["preview"].focus();
      window.frames["preview"].print();

    }


    self.today = function() {
      self.newRecord.date = new Date();
    };
    self.today();

    self.submit = function() {
      var bool = true;
      for (Key in self.newRecord) {
        bool = bool && self.newRecord[Key];
      }
      return bool;
    };

    self.generateForm = function() {

      getInspects();
      var input = angular.copy(self.newRecord);
      var local = window.localStorage;
      var data = self.newRecord.date;
      var dateF = $filter('date')(data, 'dd/MM/yyyy HH:mm');
      var inspects = self.newRecord.inspections.toString();
      console.log();
      //console.log('this is data:', data);

      local.setItem('name', self.newRecord.surname + ' ' + self.newRecord.name + ' ' + self.newRecord.middlename);
      local.setItem('date', dateF);
      local.setItem('birth', self.newRecord.birth);
      local.setItem('department', self.newRecord.department);
      local.setItem('doctor', self.newRecord.doctor);
      local.setItem('inspects', inspects);

    }

    self.add = function() {
      getInspects();
      var input = angular.copy(self.newRecord);
      self.firstForm.$setPristine();
      self.firstForm.$setUntouched();

      RecordsDB.add(input, function(data) {
        self.newRecord = angular.copy(newRecord);
        self.records.unshift(data);
      });
      alert('Запис доданий до бази данних!');
      window.localStorage.clear();

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
    self.months = [
      'Січень',
      'Лютий',
      'Березень',
      'Квітень',
      'Травень',
      'Червень',
      'Липень',
      'Серпень',
      'Вересень',
      'Жовтень',
      'Листопад',
      'Грудень'

    ]
  }


})();