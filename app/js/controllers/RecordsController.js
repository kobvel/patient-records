(function() {
  angular
    .module('patientrec.controllers')
    .controller('RecordsController', RecordsController);

  RecordsController.$inject = ['RecordsDB', 'records', '$scope', '$filter'];

  function RecordsController(RecordsDB, records, $scope, $filter) {
    var self = this;

    self.firstForm = {};
    var todayD;

    self.records = records;
    self.inspectSelected = 'abdominal';

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
      if (self.inspectSelected === 'heart') {
        self.newRecord.inspections.push('Heart');
      } else if (self.abdominal.stomach) {
        self.newRecord.inspections.push('Stomach');
      } else {
        for (key in self.abdominal) {
          if (self.abdominal[key]) {
            self.newRecord.inspections.push(key);
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
      for (key in self.newRecord) {
        bool = bool && self.newRecord[key];
      }
      return bool;
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
    };

    self.delete = function(record) {
      RecordsDB.delete({
        id: record._id
      }, function() {
        self.records.splice(self.records.indexOf(record), 1);
      })
    }
    self.abdominal = {
      kidneys: false,
      bladder: false,
      gynecology: false,
      stomach: false
    }
    self.departments = [
      'Cardiology',
      'Therapy',
      'Urology',
      'Stomatology'
    ];
    self.inspect = [
      'abdominal',
      'heart'
    ];
  }
})();