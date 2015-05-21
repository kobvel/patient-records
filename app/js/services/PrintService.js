(function() {
  angular
    .module('patientrec.services')
    .factory('RecordsDB', RecordsDB);

  RecordsDB.$inject = ['$resource'];

  function RecordsDB($resource) {
    return $resource('/records/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        isArray: true
      },
      add: {
        method: 'POST'
      },
      delete: {
        method: 'DELETE'
      }
    });
  }
})();