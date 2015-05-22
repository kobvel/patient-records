(function() {
  angular
    .module('patientrec.services')
    .service('Permission', Permission);

  Permission.$inject = [];
  var permission = false;

  function Permission() {
    return {
      get: function() {
        return permission;
      },
      set: function(perm) {
        permission = perm;
      }
    };


  }
})();