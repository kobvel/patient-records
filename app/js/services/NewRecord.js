(function() {
  angular
    .module('patientrec.services')
    .factory('NewRecord', NewRecord);


  function NewRecord() {

    return {
      setRecord: setRecord,
      record: null,
      num: 1
    }

    function setRecord(new_record) {
      this.record = new_record;
      /*this.record.name = new_record.name;
    this.record.surname = new_record.surname;
    this.record.middlename = new_record.middlename;
    this.record.birth = new_record.birth;
    this.record.department = new_record.department;
    this.record.doctor = new_record.doctor;
    this.record.inspections = new_record.inspections;
    this.record.type = new_record.type;
    this.record.date = new_record.date;*/
      this.num = 2;
      console.log(this.record);
    }

  };



})();