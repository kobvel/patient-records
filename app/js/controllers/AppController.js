(function() {
  angular
    .module('patientrec.controllers')
    .controller('AppController', AppController);

  AppController.$inject = ['Permission'];

  function AppController(Permission) {
    var self = this;



    self.permission = Permission.get();
    self.key = "1";
    self.keyCheck = '';
    self.logout = function() {
      Permission.set(false);
      self.permission = Permission.get();
      self.keyCheck = '';

      $('#login-cont').addClass('alert-danger');
      $('#login-cont').removeClass('alert-success');
    }
    self.checkKey = function() {

      if (self.key === self.keyCheck) {
        Permission.set(true);
        self.permission = Permission.get();
        self.keyCheck = '';
        $('#login-cont').removeClass('alert-danger');
        $('#login-cont').addClass('alert-success');

      } else {
        self.keyCheck = '';
        alert("Ключ введено невірно!");

      }
    }


  }


})();