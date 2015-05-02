(function() {
  angular
    .module('patientrec.controllers')
    .controller('RecordsController', RecordsController);

  RecordsController.$inject = ['RecordsDB', 'records', '$scope'];

  function RecordsController(RecordsDB, records, $scope) {
    var self = this;
    var todayD;
    self.records = records;
    var newRecord = {
      name: '',
      surname: '',
      middlename: '',
      birth: '',
      department: '',
      doctor: '',
      inspections: '',
      type: '',
      date: ''
    };


    self.newRecord = angular.copy(newRecord);

    $scope.today = function() {
      self.newRecord.date = new Date();
    };
    $scope.today();

    $scope.formats = ['dd-MMMM-yyyy hh:mm'];
    $scope.format = $scope.formats[0];


    self.open = function($event) {

      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };


    self.add = function() {
      var input = angular.copy(self.newRecord);

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

    self.departments = [
      'Cardiology',
      'Therapy',
      'Urology',
      'Stomatology'
    ];
    self.review = 'firstly';
    self.inspect = [
      'abdominal',
      'heart'
    ];
  }
})();