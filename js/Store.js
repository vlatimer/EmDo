(function (window) {
  class Store {
    constructor(name, callback) {
      callback = callback || function () {};
      this.dbName = name;

      if (!localStorage.getItem(name)) {
        var emdos = [];

        localStorage.setItem(name, JSON.stringify(emdos));
      }

      callback.call(this, JSON.parse(localStorage.getItem(name)));
    }

    find(query, order, callback) {
      if (!callback) {
        return;
      }

      var emdos = JSON.parse(localStorage.getItem(this.dbName));
      emdos = emdos.map((em) => new app.Employee(em));

      emdos = emdos.filter(function (em) {
        for (var q in query) {
          if (query[q] !== em[q]) {
            return false;
          }
        }
        return true;
      });
      if (order) {
        emdos = emdos.sort((a, b) => {
          let first = a[order] || Infinity;
          let second = b[order] || Infinity;
          console.log(first, second);
          if (first > second) {
            return 1;
          } else if (first < second) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      console.log(order);
      callback(emdos);
    }

    update(updateData, id, callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName)) || [];

      callback = callback || function () {};

      let item;

      for (var i = 0; i < emdos.length; i++) {
        if (emdos[i].id === id) {
          for (var key in updateData) {
            emdos[i][key] = updateData[key];
          }
          item = emdos[i];
          break;
        }
      }
      localStorage.setItem(this.dbName, JSON.stringify(emdos));
      callback(new app.Employee(item));
    }

    create = function (data, callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName)) || [];

      callback = callback || function () {};

      let newEmdo = app.Employee.build(data);
      let dbData = newEmdo.toDbData();

      emdos.push(dbData);
      localStorage.setItem(this.dbName, JSON.stringify(emdos));
      callback(newEmdo);
    };

    remove = function (id, callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName));

      for (let i = 0; i < emdos.length; i++) {
        if (emdos[i].id === id) {
          emdos.splice(i, 1);
          break;
        }
      }
      localStorage.setItem(this.dbName, JSON.stringify(emdos));
      callback(id);
    };
  }
  window.app = window.app || {};
  window.app.Store = Store;
})(window);
