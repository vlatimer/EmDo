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

    find = function (query, callback) {
      if (!callback) {
        return;
      }

      var emdos = JSON.parse(localStorage.getItem(this.dbName));
      console.log(query);
      callback(
        emdos.filter(function (em) {
          for (var q in query) {
            if (query[q] !== em[q]) {
              return false;
            }
          }
          return true;
        })
      );
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
        callback.call(this, emdos);
      } else {
        updateData.id = new Date().getTime() - grn(1, 10000);
        emdos.push(updateData);
        localStorage.setItem(this.dbName, JSON.stringify(emdos));
        callback.call(this, [updateData]);
      }
    };

    remove = function (id, callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName));
      var deletionDate = new Date();
      var deletionTime = fd(deletionDate);
      for (let i = 0; i < emdos.length; i++) {
        if (emdos[i].id === id) {
          emdos[i].deletionTime = deletionTime;
          emdos[i].deletionDate = deletionDate;
          emdos[i].status = "del";
          break;
        }
      }
      localStorage.setItem(this.dbName, JSON.stringify(emdos));
      callback({ id: id, deleteTime: deletionTime });
    };

    getLength = function (callback) {
      var length = JSON.parse(localStorage.getItem(this.dbName)).length;
      callback(length);
    };
  }
  window.app = window.app || {};
  window.app.Store = Store;
})(window);
