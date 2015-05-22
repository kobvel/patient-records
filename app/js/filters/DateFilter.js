(function() {
  angular
    .module('patientrec.filters')
    .filter('filterDate', filterDate);

  function filterDate() {
    return function(items, day, month) {
      var filtered = [];

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var day_tmp = new Date(item.date).getDate();
        var month_tmp = new Date(item.date).getMonth() + 1;
        month_tmp = month_tmp.toString();
        day_tmp = day_tmp.toString();
        if ((day_tmp === day || !day) && (month_tmp === month || !month)) {
          filtered.push(item);
        }
      }
      return filtered;
    }

  }






})();