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

    find = function (query, callback, order) {
      if (!callback) {
        return;
      }

      var emdos = JSON.parse(localStorage.getItem(this.dbName));
      emdos = emdos.filter(function (em) {
        for (var q in query) {
          if (query[q] !== em[q]) {
            return false;
          }
        }
        return true;
      });
      console.log(order);
      if (order) {
        emdos = emdos.sort((a, b) => {
          let first = a[order] || Infinity;
          let second = b[order] || Infinity;

          if (first > second) {
            return 1;
          } else if (first < second) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      callback(emdos);
    };

    findAll = function (callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName));
      callback(emdos);
    };

    save = function (updateData, callback, id) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName)) || [];

      callback = callback || function () {};

      if (id) {
        for (var i = 0; i < emdos.length; i++) {
          if (emdos[i].id === id) {
            for (var key in updateData) {
              emdos[i][key] = updateData[key];
            }
            break;
          }
        }
        localStorage.setItem(this.dbName, JSON.stringify(emdos));
        callback.call(this, { id: id, ...updateData });
      } else {
        updateData.id = new Date().getTime() - getRandomNumber(1, 10000);
        emdos.push(updateData);
        localStorage.setItem(this.dbName, JSON.stringify(emdos));
        callback.call(this, [updateData]);
      }
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
      callback({ id: id });
    };

    getLength = function (callback) {
      var length = JSON.parse(localStorage.getItem(this.dbName)).length;
      callback(length);
    };
  }
  window.app = window.app || {};
  window.app.Store = Store;
})(window);
