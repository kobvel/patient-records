(function() {
  angular
    .module('patientrec.controllers')
    .controller('AppController', AppController);

  AppController.$inject = ['Permission'];

  function AppController(Permission) {
    var self = this;


    self.permission = Permission.get();
    self.key = "09031994";
    self.keyCheck = '';
    self.logout = function() {
      Permission.set(false);
      self.permission = Permission.get();
      self.keyCheck = '';
    }

    self.init = function(){     
      var size = 768/1.5;   
      $('#table-cont').height(size);

    }
    
    self.checkKey = function() {
      if (self.key === self.keyCheck) {
        Permission.set(true);
        self.permission = Permission.get();
        self.keyCheck = '';
      } else {
        self.keyCheck = '';
        alert("Ключ введено невірно!");
      }
    }
  }


})();