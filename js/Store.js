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

    find(filters, sorting, callback) {
      if (!callback) {
        throw new Error("callback must be provided");
      }
      let data = JSON.parse(localStorage.getItem(this.dbName));

      if (filters) {
        data = data.filter(function (item) {
          let _return = true;

          console.log(filters);
          for (let key in filters) {
            let value = filters[key];
            if (typeof value === "function") {
              _return = _return && value(item[key]);
            } else {
              _return = _return && item[key] === value;
            }
          }
          return _return;
        });
      }

      if (sorting) {
        data = data.sort(sorting);
      }
      console.log(data);
      callback(data);
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
      callback(item);
    }

    create(data, callback) {
      callback = callback || function () {};

      const emdos = JSON.parse(localStorage.getItem(this.dbName)) || [];

      data.id = new Date().getTime() - getRandomNumber(1, 10000);
      emdos.push(data);

      localStorage.setItem(this.dbName, JSON.stringify(emdos));
      callback(data);
    }

    remove(id, callback) {
      var emdos = JSON.parse(localStorage.getItem(this.dbName));

      for (let i = 0; i < emdos.length; i++) {
        if (emdos[i].id === id) {
          emdos.splice(i, 1);
          break;
        }
      }
      localStorage.setItem(this.dbName, JSON.stringify(emdos));
      callback(id);
    }
  }
  window.app = window.app || {};
  window.app.Store = Store;
})(window);
