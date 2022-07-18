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
        updateData.id = new Date().getTime();
        emdos.push(updateData);
        localStorage.setItem(this.dbName, JSON.stringify(emdos));
        callback.call(this, [updateData]);
      }
    };

    remove = function (id, callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName));
      var deleteTime = fd(new Date());
      for (let i = 0; i < emdos.length; i++) {
        if (emdos[i].id === id) {
          emdos[i].deletionTime = deleteTime;
          break;
        }
      }
      localStorage.setItem(this.dbName, JSON.stringify(emdos));
      callback({ id: id, deleteTime: deleteTime });
    };

    getLength = function (callback) {
      var length = JSON.parse(localStorage.getItem(this.dbName)).length;
      callback(length);
    };
  }
  window.app = window.app || {};
  window.app.Store = Store;
})(window);
